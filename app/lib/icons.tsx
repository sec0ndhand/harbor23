import {
  ICON_LOOKUP,
  type IconName,
  type IconManifestEntry,
} from "../../scripts/icon-manifest";

// Discover which icon PNGs actually exist on disk at build time. Vite inlines
// this glob, so the resolved map is a static table the production bundle can
// use with zero runtime IO. Missing icons cleanly fall back to the emoji.
const GENERATED_ICONS = import.meta.glob<{ default: string }>(
  "../assets/icons/*.png",
  { eager: true, query: "?url", import: "default" }
) as unknown as Record<string, string>;

function resolveImageUrl(key: string): string | null {
  // Vite's glob returns keys relative to this file: "../assets/icons/<key>.png".
  const match = Object.entries(GENERATED_ICONS).find(([path]) =>
    path.endsWith(`/${key}.png`)
  );
  return match ? (match[1] as unknown as string) : null;
}

export interface IconProps {
  name: IconName | string;
  size?: number;
  className?: string;
  /** Override the default alt text from the manifest. */
  alt?: string;
  /** Treat the icon as decorative — announces nothing to screen readers. */
  decorative?: boolean;
}

/**
 * Renders an icon from the clay library.
 *
 * If a generated PNG exists at app/assets/icons/<name>.png, we render it as
 * an <img> with explicit width/height (CLS-safe). Otherwise we fall back to
 * the emoji from scripts/icon-manifest.ts, so the site keeps working even
 * before the generation script has been run.
 */
export function Icon({
  name,
  size = 48,
  className = "",
  alt,
  decorative = false,
}: IconProps) {
  const entry: IconManifestEntry | undefined = ICON_LOOKUP[name];

  // Unknown keys fall through to a safe empty span — better than a missing
  // image or a thrown error in production.
  if (!entry) {
    return (
      <span
        className={className}
        style={{ display: "inline-block", width: size, height: size }}
        aria-hidden="true"
      />
    );
  }

  const imageUrl = resolveImageUrl(entry.key);
  const accessibleAlt = alt ?? entry.alt;
  const ariaHidden = decorative ? true : undefined;

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={decorative ? "" : accessibleAlt}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={className}
        aria-hidden={ariaHidden}
      />
    );
  }

  // Emoji fallback. We size it to match the requested pixel size so layouts
  // don't jump when real PNGs later replace the emoji.
  return (
    <span
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : accessibleAlt}
      aria-hidden={ariaHidden}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        fontSize: Math.round(size * 0.75),
        lineHeight: 1,
      }}
    >
      {entry.emoji}
    </span>
  );
}

// Re-export for convenience so consumers only need one import.
export type { IconName } from "../../scripts/icon-manifest";
