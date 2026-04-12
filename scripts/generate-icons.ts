/**
 * Generate clay-style icons by calling the OpenAI Images API (gpt-image-1).
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-icons.ts
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-icons.ts --only lake-access
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-icons.ts --only lake-access,fire-pit
 *
 * Output: app/assets/icons/<key>.png (1024x1024 PNG with transparent bg).
 * Vite's glob import in app/lib/icons.tsx automatically picks up new files.
 *
 * The script skips icons that already exist unless --force is passed. This
 * lets you iterate on single icons without re-billing the full set.
 */

import { writeFile, mkdir, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ICON_MANIFEST,
  ICON_SYSTEM_PROMPT,
  type IconManifestEntry,
} from "./icon-manifest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ICONS_DIR = resolve(__dirname, "../app/assets/icons");

interface Args {
  only: string[] | null;
  force: boolean;
}

function parseArgs(argv: string[]): Args {
  let only: string[] | null = null;
  let force = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--only") {
      const value = argv[++i] ?? "";
      only = value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (arg === "--force") {
      force = true;
    }
  }
  return { only, force };
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function generateOne(entry: IconManifestEntry): Promise<void> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Export it before running this script."
    );
  }

  const prompt = `${ICON_SYSTEM_PROMPT}\n\nSubject: ${entry.subject}`;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size: "1024x1024",
      background: "transparent",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `OpenAI API returned ${response.status}: ${text.slice(0, 500)}`
    );
  }

  const body = (await response.json()) as {
    data: Array<{ b64_json?: string; url?: string }>;
  };
  const item = body.data?.[0];
  if (!item) throw new Error("No image in response");

  let buffer: Buffer;
  if (item.b64_json) {
    buffer = Buffer.from(item.b64_json, "base64");
  } else if (item.url) {
    const imgResponse = await fetch(item.url);
    if (!imgResponse.ok) {
      throw new Error(`Image fetch failed: ${imgResponse.status}`);
    }
    buffer = Buffer.from(await imgResponse.arrayBuffer());
  } else {
    throw new Error("Response did not include b64_json or url");
  }

  const outPath = resolve(ICONS_DIR, `${entry.key}.png`);
  await writeFile(outPath, buffer);
  console.log(`  ✓ ${entry.key}.png (${buffer.byteLength.toLocaleString()} bytes)`);
}

async function main() {
  const { only, force } = parseArgs(process.argv.slice(2));

  await mkdir(ICONS_DIR, { recursive: true });

  let toGenerate: readonly IconManifestEntry[] = ICON_MANIFEST;
  if (only) {
    const keys = new Set(only);
    toGenerate = ICON_MANIFEST.filter((e) => keys.has(e.key));
    const unknown = [...keys].filter(
      (k) => !ICON_MANIFEST.some((e) => e.key === k)
    );
    if (unknown.length) {
      console.error(`Unknown icon key(s): ${unknown.join(", ")}`);
      process.exit(1);
    }
  }

  console.log(
    `Generating ${toGenerate.length} icon(s)${only ? ` (filtered)` : ""}${
      force ? " [force]" : ""
    }…`
  );

  let generated = 0;
  let skipped = 0;
  for (const entry of toGenerate) {
    const outPath = resolve(ICONS_DIR, `${entry.key}.png`);
    if (!force && (await fileExists(outPath))) {
      console.log(`  ○ ${entry.key}.png already exists — skipping`);
      skipped++;
      continue;
    }
    try {
      await generateOne(entry);
      generated++;
    } catch (err) {
      console.error(
        `  ✗ ${entry.key} failed: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }
  }

  console.log(
    `\nDone. ${generated} generated, ${skipped} skipped, ${
      toGenerate.length - generated - skipped
    } failed.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
