import { describe, expect, it } from "vitest";
import { buildMeta, PAGE_META } from "~/lib/seo";

describe("buildMeta", () => {
  it("emits title, description, and social tags for a page config", () => {
    const meta = buildMeta(PAGE_META.home);

    const getTitle = meta.find((m): m is { title: string } => "title" in m);
    const getDescription = meta.find(
      (m): m is { name: string; content: string } =>
        "name" in m && m.name === "description"
    );
    const getOgTitle = meta.find(
      (m): m is { property: string; content: string } =>
        "property" in m && m.property === "og:title"
    );
    const getTwitterCard = meta.find(
      (m): m is { name: string; content: string } =>
        "name" in m && m.name === "twitter:card"
    );

    expect(getTitle?.title).toBe(PAGE_META.home.title);
    expect(getDescription?.content).toBe(PAGE_META.home.description);
    expect(getOgTitle?.content).toBe(PAGE_META.home.title);
    expect(getTwitterCard?.content).toBe("summary_large_image");
  });

  it("emits a canonical link tag when canonical is provided", () => {
    const meta = buildMeta({
      title: "t",
      description: "d",
      canonical: "/the-house",
    });
    const canonical = meta.find(
      (m): m is { tagName: string; rel: string; href: string } =>
        "tagName" in m && m.tagName === "link"
    );
    expect(canonical?.rel).toBe("canonical");
    expect(canonical?.href).toMatch(/\/the-house$/);
  });

  it("emits a noindex robots tag when noIndex is set", () => {
    const meta = buildMeta({ title: "t", description: "d", noIndex: true });
    const robots = meta.find(
      (m): m is { name: string; content: string } =>
        "name" in m && m.name === "robots"
    );
    expect(robots?.content).toBe("noindex, nofollow");
  });

  it("has a distinct title and description for every PAGE_META entry", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const key of Object.keys(PAGE_META) as (keyof typeof PAGE_META)[]) {
      const entry = PAGE_META[key];
      titles.add(entry.title);
      descriptions.add(entry.description);
    }
    // All pages should have unique titles and descriptions (SEO hygiene).
    expect(titles.size).toBe(Object.keys(PAGE_META).length);
    expect(descriptions.size).toBe(Object.keys(PAGE_META).length);
  });
});
