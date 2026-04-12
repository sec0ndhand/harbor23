import { test, expect } from "@playwright/test";

// Smoke tests cover the high-value things a first-time visitor depends on:
// every route loads, the sitemap and robots file are served correctly, and
// the booking form is present and submission-ready.

const ROUTES: Array<{ path: string; heading: RegExp }> = [
  { path: "/", heading: /harbor on 23rd|lake geneva|blue juniper/i },
  { path: "/the-house", heading: /harbor on 23rd|the house|bedrooms/i },
  { path: "/amenities", heading: /amenities/i },
  { path: "/location", heading: /location|lake geneva/i },
  { path: "/golf-trips", heading: /golf/i },
  { path: "/bachelorette-party", heading: /bachelorette/i },
  { path: "/family-vacation", heading: /family/i },
  { path: "/book", heading: /book your stay/i },
  { path: "/reviews", heading: /guest|review/i },
  { path: "/faq", heading: /faq|question/i },
  { path: "/blog", heading: /blog|travel/i },
];

for (const { path, heading } of ROUTES) {
  test(`${path} loads and renders an H1`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    // Every marketing page has exactly one visible H1 — fail loudly if not.
    await expect(page.locator("h1").first()).toContainText(heading);
  });
}

test("sitemap.xml returns valid XML with all key URLs", async ({ page }) => {
  const response = await page.goto("/sitemap.xml");
  expect(response?.status()).toBe(200);

  const contentType = response?.headers()["content-type"] || "";
  expect(contentType).toContain("application/xml");

  const xml = await response!.text();
  expect(xml).toContain("<urlset");
  expect(xml).toContain("/golf-trips");
  expect(xml).toContain("/bachelorette-party");
  expect(xml).toContain("/family-vacation");
  expect(xml).toContain("/blog/weekend-getaway-from-chicago-lake-geneva");
});

test("robots.txt is served and references the sitemap", async ({ page }) => {
  const response = await page.goto("/robots.txt");
  expect(response?.status()).toBe(200);
  const text = await response!.text();
  expect(text).toMatch(/Sitemap:.*sitemap\.xml/);
});

test("booking form is present with required fields", async ({ page }) => {
  await page.goto("/book");

  // Netlify Forms attributes must be on the rendered form.
  const form = page.locator("form[name='inquiry']");
  await expect(form).toBeVisible();
  await expect(form).toHaveAttribute("data-netlify", "true");

  // Hidden form-name field is what Netlify routes submissions by.
  await expect(form.locator("input[name='form-name']")).toHaveValue("inquiry");

  // The required user-facing fields.
  await expect(form.locator("input[name='name']")).toBeVisible();
  await expect(form.locator("input[name='email']")).toBeVisible();
  await expect(form.locator("textarea[name='message']")).toBeVisible();
});

test("dynamic blog post renders markdown content", async ({ page }) => {
  const response = await page.goto(
    "/blog/weekend-getaway-from-chicago-lake-geneva"
  );
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toContainText(/weekend getaway/i);
  // The markdown parser produces an H2 section heading in the article body.
  await expect(page.locator("article, main").getByRole("heading", { level: 2 }).first()).toBeVisible();
});

test("home page has no console errors on first load", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  expect(errors, `Unexpected console errors: ${errors.join("\n")}`).toEqual([]);
});
