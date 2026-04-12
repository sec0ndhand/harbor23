/**
 * Sync photos from the Airbnb listing into the local repo.
 *
 * Usage:
 *   npx tsx scripts/sync-airbnb-photos.ts
 *
 * What it does:
 *   1. Fetches https://www.airbnb.com/rooms/<id> as HTML.
 *   2. Extracts every muscache.com/im/pictures/hosting/.../original/*.jpeg
 *      URL that appears in the page.
 *   3. Matches each URL to a room-specific accessibilityLabel from the
 *      tour section when one exists, otherwise assigns a "listing-N" slug.
 *   4. Downloads each original to the scratch dir.
 *   5. Uses sharp to generate WebP variants at 400/800/1200/1600 widths
 *      plus one high-quality JPEG fallback, all in public/images/listing/.
 *   6. Emits app/lib/listing-photos.ts — a typed manifest consumed by
 *      property-data.ts and Gallery.tsx.
 *
 * Runs offline-safe: downloads are cached in public/images/listing/, so
 * re-running only rebuilds variants (skips the network step) unless
 * --refetch is passed.
 */

import { writeFile, mkdir, readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const OUTPUT_DIR = resolve(REPO_ROOT, "public/images/listing");
const MANIFEST_PATH = resolve(REPO_ROOT, "app/lib/listing-photos.ts");
const CACHE_DIR = resolve(REPO_ROOT, ".cache/airbnb-originals");

const LISTING_ID = "724172366486876051";
const LISTING_URL = `https://www.airbnb.com/rooms/${LISTING_ID}`;

const WIDTHS = [400, 800, 1200, 1600] as const;

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 " +
  "(KHTML, like Gecko) Version/17.0 Safari/605.1.15";

interface Args {
  refetch: boolean;
}

function parseArgs(argv: string[]): Args {
  return { refetch: argv.includes("--refetch") };
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function fetchListingHtml(args: Args): Promise<string> {
  const cached = resolve(CACHE_DIR, "listing.html");
  if (!args.refetch && (await fileExists(cached))) {
    return readFile(cached, "utf8");
  }
  console.log(`Fetching ${LISTING_URL}…`);
  const response = await fetch(LISTING_URL, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });
  if (!response.ok) {
    throw new Error(`Airbnb returned ${response.status}`);
  }
  const html = await response.text();
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(cached, html, "utf8");
  console.log(`  cached ${html.length.toLocaleString()} bytes`);
  return html;
}

interface ExtractedPhoto {
  originalUrl: string;
  filename: string;
  room: string | null;
  roomIndex: number | null;
}

/**
 * Pair each photo URL with a room-specific accessibility label, but only
 * when both live inside the same JSON object. The `[^{}]*?` guard in the
 * regex is the whole trick: it refuses to cross a `{` or `}` boundary,
 * so a label from one tour-photo object can't leak onto a different
 * photo's URL. Both orderings (label-before-url and url-before-label)
 * are captured and merged.
 */
function extractPhotos(html: string): ExtractedPhoto[] {
  const ROOM_PREFIX =
    "(?:Bedroom|Bathroom|Kitchen|Living|Dining|Exterior|Backyard|" +
    "Balcony|Patio|Office|Common|Deck|Game|Media|Garage|Porch|Outdoor|" +
    "Basement|Hallway|Loft|Foyer|Entry|Front)";
  const URL_PATTERN =
    "https:\\/\\/a0\\.muscache\\.com\\/im\\/pictures\\/hosting\\/" +
    "[^\"\\\\?]+\\/original\\/[a-f0-9-]+\\.jpeg";

  const labelFirst = new RegExp(
    `"accessibilityLabel"\\s*:\\s*"(${ROOM_PREFIX}[^"]*)"[^{}]*?"baseUrl"\\s*:\\s*"(${URL_PATTERN})"`,
    "g"
  );
  const urlFirst = new RegExp(
    `"baseUrl"\\s*:\\s*"(${URL_PATTERN})"[^{}]*?"accessibilityLabel"\\s*:\\s*"(${ROOM_PREFIX}[^"]*)"`,
    "g"
  );

  const urlToLabel = new Map<string, string>();
  let m: RegExpExecArray | null;
  while ((m = labelFirst.exec(html)) !== null) {
    if (!urlToLabel.has(m[2])) urlToLabel.set(m[2], m[1]);
  }
  while ((m = urlFirst.exec(html)) !== null) {
    if (!urlToLabel.has(m[1])) urlToLabel.set(m[1], m[2]);
  }

  // Enumerate every unique listing photo URL in source order; labels come
  // from the map above, unlabeled photos fall through with room=null.
  const orderedUnique = new Map<string, number>();
  const bareUrlRe = new RegExp(URL_PATTERN, "g");
  let order = 0;
  while ((m = bareUrlRe.exec(html)) !== null) {
    if (!orderedUnique.has(m[0])) orderedUnique.set(m[0], order++);
  }

  const photos: ExtractedPhoto[] = [];
  for (const [url, idx] of [...orderedUnique.entries()].sort(
    (a, b) => a[1] - b[1]
  )) {
    photos.push({
      originalUrl: url,
      filename: url.split("/").pop()!,
      room: urlToLabel.get(url) ?? null,
      roomIndex: idx,
    });
  }
  return photos;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface ResolvedPhoto extends ExtractedPhoto {
  key: string; // stable filename stem (no extension, no width)
}

function assignKeys(photos: ExtractedPhoto[]): ResolvedPhoto[] {
  // Group by room prefix (e.g. "Bedroom 1") so we can re-number the
  // per-room images cleanly even if the source label text drifts.
  const roomCounters = new Map<string, number>();
  const resolved: ResolvedPhoto[] = [];
  for (const photo of photos) {
    let key: string;
    if (photo.room) {
      const roomBase = photo.room.replace(/\s+image\s+\d+$/i, "");
      const slug = slugify(roomBase);
      const next = (roomCounters.get(slug) ?? 0) + 1;
      roomCounters.set(slug, next);
      key = `${slug}-${String(next).padStart(2, "0")}`;
    } else {
      // Images that the tour section doesn't cover — keep a stable slug
      // based on the source filename hash prefix so re-runs don't churn.
      const prefix = photo.filename.slice(0, 8);
      key = `listing-${prefix}`;
    }
    resolved.push({ ...photo, key });
  }
  return resolved;
}

async function downloadOriginal(photo: ResolvedPhoto): Promise<Buffer> {
  const cachePath = resolve(CACHE_DIR, photo.filename);
  if (await fileExists(cachePath)) {
    return readFile(cachePath);
  }
  console.log(`  ↓ ${photo.filename}`);
  const response = await fetch(photo.originalUrl);
  if (!response.ok) {
    throw new Error(`Download ${photo.filename} failed: ${response.status}`);
  }
  const buf = Buffer.from(await response.arrayBuffer());
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(cachePath, buf);
  return buf;
}

interface ManifestEntry {
  key: string;
  /** Original UUID filename from the Airbnb CDN (for traceability). */
  originalFilename: string;
  room: string | null;
  alt: string;
  /** Fallback JPEG path, full quality, served for <img src=…>. */
  src: string;
  /** srcSet string for responsive loading. */
  srcSet: string;
  /** Intrinsic dimensions, so <img width height> can prevent CLS. */
  width: number;
  height: number;
}

async function processPhoto(photo: ResolvedPhoto): Promise<ManifestEntry> {
  const original = await downloadOriginal(photo);
  const meta = await sharp(original).metadata();
  const origWidth = meta.width ?? 1600;
  const origHeight = meta.height ?? 1067;

  // Fallback full-quality JPEG — one file per photo, used as <img src>.
  const jpgName = `${photo.key}.jpg`;
  await sharp(original)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(resolve(OUTPUT_DIR, jpgName));

  // WebP variants at each listed width, but never upscale beyond the source.
  const widths = WIDTHS.filter((w) => w <= origWidth);
  const sources: string[] = [];
  for (const w of widths) {
    const webpName = `${photo.key}-${w}w.webp`;
    await sharp(original)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(resolve(OUTPUT_DIR, webpName));
    sources.push(`/images/listing/${webpName} ${w}w`);
  }

  // Scaled intrinsic dimensions tied to the widest generated variant so
  // the browser can reserve the right aspect ratio.
  const targetWidth = widths[widths.length - 1] ?? origWidth;
  const scale = targetWidth / origWidth;
  const displayHeight = Math.round(origHeight * scale);

  const altPrefix = photo.room
    ? photo.room.replace(/\bimage\s+(\d+)$/i, "— view $1")
    : "Harbor on 23rd";
  const alt = `${altPrefix} at Harbor on 23rd — Lake Geneva vacation rental`;

  return {
    key: photo.key,
    originalFilename: photo.filename,
    room: photo.room,
    alt,
    src: `/images/listing/${jpgName}`,
    srcSet: sources.join(", "),
    width: targetWidth,
    height: displayHeight,
  };
}

function generateManifestFile(entries: ManifestEntry[]): string {
  const header = `// Generated by scripts/sync-airbnb-photos.ts — do not edit by hand.
// Re-run \`npx tsx scripts/sync-airbnb-photos.ts\` to refresh from the live
// Airbnb listing.
//
// Each entry points at files in public/images/listing/ and includes a
// srcSet for responsive loading. Used by property-data.ts IMAGES and the
// Gallery component.

export interface ListingPhoto {
  key: string;
  originalFilename: string;
  room: string | null;
  alt: string;
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

export const LISTING_PHOTOS = ${JSON.stringify(entries, null, 2)} as const satisfies readonly ListingPhoto[];

export const LISTING_PHOTOS_BY_KEY: Record<string, ListingPhoto> =
  Object.fromEntries(LISTING_PHOTOS.map((p) => [p.key, p]));
`;
  return header;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  await mkdir(OUTPUT_DIR, { recursive: true });

  const html = await fetchListingHtml(args);
  const extracted = extractPhotos(html);
  console.log(`Found ${extracted.length} unique photos`);
  const withLabel = extracted.filter((p) => p.room).length;
  console.log(`  ${withLabel} matched to a tour room label`);
  console.log(`  ${extracted.length - withLabel} unlabeled (listing-only)`);

  const resolved = assignKeys(extracted);
  console.log();
  console.log("Slug mapping:");
  for (const p of resolved) {
    console.log(`  ${p.key.padEnd(22)} ← ${p.room ?? "(no room label)"}`);
  }
  console.log();

  const manifest: ManifestEntry[] = [];
  for (const photo of resolved) {
    try {
      const entry = await processPhoto(photo);
      manifest.push(entry);
    } catch (err) {
      console.error(
        `  ✗ ${photo.key}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  await writeFile(MANIFEST_PATH, generateManifestFile(manifest));
  console.log();
  console.log(
    `✓ Wrote ${manifest.length} photos to public/images/listing/ and manifest to ${MANIFEST_PATH.replace(
      REPO_ROOT + "/",
      ""
    )}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
