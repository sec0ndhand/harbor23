import { describe, expect, it } from "vitest";
import { loader } from "~/routes/sitemap.xml";

describe("sitemap.xml loader", () => {
  it("returns valid XML with correct Content-Type and Cache-Control", async () => {
    // The loader only consumes `request`; the rest of LoaderFunctionArgs is
    // cast because React Router types recently added new required fields.
    const response = await loader({
      request: new Request("http://localhost/sitemap.xml"),
      params: {},
      context: {},
    } as Parameters<typeof loader>[0]);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toMatch(/application\/xml/);
    expect(response.headers.get("Cache-Control")).toMatch(/max-age=3600/);

    const xml = await response.text();
    expect(xml.startsWith("<?xml")).toBe(true);
    expect(xml).toContain("<urlset");
    expect(xml).toContain("</urlset>");
  });

  it("includes every static route plus the seed blog posts", async () => {
    // The loader only consumes `request`; the rest of LoaderFunctionArgs is
    // cast because React Router types recently added new required fields.
    const response = await loader({
      request: new Request("http://localhost/sitemap.xml"),
      params: {},
      context: {},
    } as Parameters<typeof loader>[0]);
    const xml = await response.text();

    // Core static routes
    const expectedPaths = [
      "/",
      "/the-house",
      "/amenities",
      "/location",
      "/golf-trips",
      "/bachelorette-party",
      "/family-vacation",
      "/book",
      "/reviews",
      "/faq",
      "/blog",
    ];
    for (const path of expectedPaths) {
      expect(xml).toContain(`<loc>https://harbor23.com${path}</loc>`);
    }

    // Seed blog posts
    expect(xml).toContain("/blog/weekend-getaway-from-chicago-lake-geneva");
    expect(xml).toContain("/blog/best-golf-courses-near-chicago");
    expect(xml).toContain("/blog/bachelorette-weekend-lake-geneva-vs-nashville");
    expect(xml).toContain("/blog/family-lake-houses-near-chicago");
  });
});
