import { describe, expect, it } from "vitest";
import { getBlogPost, getBlogPosts } from "~/lib/blog";

describe("blog loader (static MDX/markdown)", () => {
  it("returns the four seed posts sorted newest first", async () => {
    const posts = await getBlogPosts();
    expect(posts.length).toBeGreaterThanOrEqual(4);

    const slugs = posts.map((p) => p.slug);
    expect(slugs).toContain("weekend-getaway-from-chicago-lake-geneva");
    expect(slugs).toContain("best-golf-courses-near-chicago");
    expect(slugs).toContain("bachelorette-weekend-lake-geneva-vs-nashville");
    expect(slugs).toContain("family-lake-houses-near-chicago");

    // Posts must be sorted newest-first by published_at.
    for (let i = 1; i < posts.length; i++) {
      expect(
        posts[i - 1].published_at.localeCompare(posts[i].published_at)
      ).toBeGreaterThanOrEqual(0);
    }
  });

  it("filters by category", async () => {
    const golf = await getBlogPosts({ category: "golf" });
    expect(golf.length).toBeGreaterThanOrEqual(1);
    expect(golf.every((p) => p.category === "golf")).toBe(true);
  });

  it("respects the limit option", async () => {
    const limited = await getBlogPosts({ limit: 2 });
    expect(limited).toHaveLength(2);
  });

  it("getBlogPost() returns a single post with parsed HTML content", async () => {
    const post = await getBlogPost("weekend-getaway-from-chicago-lake-geneva");
    expect(post).not.toBeNull();
    expect(post?.title).toContain("Weekend Getaway");
    // Markdown should be converted to HTML — we expect at least one heading.
    expect(post?.content).toMatch(/<h2/);
    // The hero image key resolves to a local path or a CDN URL.
    expect(post?.hero_image).toMatch(/^(\/|https:\/\/)/);
  });

  it("getBlogPost() returns null for an unknown slug", async () => {
    const post = await getBlogPost("this-post-does-not-exist");
    expect(post).toBeNull();
  });

  it("every post has title, excerpt, category, and content", async () => {
    const posts = await getBlogPosts();
    for (const post of posts) {
      expect(post.title).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.category).toMatch(/^(golf|bachelorette|family|general|local)$/);
      expect(post.content.length).toBeGreaterThan(100);
    }
  });
});
