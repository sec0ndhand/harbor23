import type { LoaderFunctionArgs } from "react-router";
import { getBlogPosts } from "~/lib/pocketbase.server";

const SITE_URL = process.env.SITE_URL || "https://harbor23.com";

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/the-house", priority: "0.9", changefreq: "monthly" },
  { path: "/amenities", priority: "0.8", changefreq: "monthly" },
  { path: "/location", priority: "0.8", changefreq: "monthly" },
  { path: "/golf-trips", priority: "0.9", changefreq: "monthly" },
  { path: "/bachelorette-party", priority: "0.9", changefreq: "monthly" },
  { path: "/family-vacation", priority: "0.9", changefreq: "monthly" },
  { path: "/book", priority: "0.8", changefreq: "monthly" },
  { path: "/reviews", priority: "0.7", changefreq: "weekly" },
  { path: "/faq", priority: "0.7", changefreq: "monthly" },
  { path: "/blog", priority: "0.7", changefreq: "weekly" },
];

function toW3CDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export async function loader(_args: LoaderFunctionArgs) {
  const today = toW3CDate(new Date());

  // Fetch blog posts for dynamic URLs
  const blogPosts = await getBlogPosts({ limit: 100 });

  const blogEntries = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: "0.6",
    changefreq: "monthly",
    lastmod: post.published_at
      ? toW3CDate(new Date(post.published_at))
      : today,
  }));

  const allRoutes = [
    ...STATIC_ROUTES.map((r) => ({ ...r, lastmod: today })),
    ...blogEntries,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
