import { describe, expect, it } from "vitest";
import { ICON_MANIFEST, ICON_LOOKUP } from "../../scripts/icon-manifest";
import { AMENITIES } from "~/lib/property-data";

describe("icon manifest", () => {
  it("has no duplicate keys", () => {
    const keys = ICON_MANIFEST.map((e) => e.key);
    const unique = new Set(keys);
    expect(unique.size).toBe(keys.length);
  });

  it("every entry has a subject, alt, and fallback emoji", () => {
    for (const entry of ICON_MANIFEST) {
      expect(entry.key).toMatch(/^[a-z][a-z0-9-]*$/);
      expect(entry.subject.length).toBeGreaterThan(10);
      expect(entry.alt.length).toBeGreaterThan(3);
      expect(entry.emoji.length).toBeGreaterThan(0);
    }
  });

  it("every AMENITIES icon key resolves to a real manifest entry", () => {
    const missing: string[] = [];
    for (const amenity of AMENITIES) {
      if (!ICON_LOOKUP[amenity.icon]) {
        missing.push(`${amenity.label} → ${amenity.icon}`);
      }
    }
    expect(missing, `Missing icons: ${missing.join(", ")}`).toEqual([]);
  });
});
