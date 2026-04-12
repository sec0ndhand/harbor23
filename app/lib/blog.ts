import matter from "gray-matter";
import { marked } from "marked";
import type { BlogPost } from "./types";
import { IMAGES } from "./property-data";

// Import all markdown files as raw strings at build time.
// `eager: true` means they're inlined into the bundle, so there are no async
// file reads at request time — everything is ready when the server boots.
const files = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function slugFromPath(path: string): string {
  const filename = path.split("/").pop() || "";
  return filename.replace(/\.md$/, "");
}

function resolveHeroImage(key: string | undefined): string {
  if (!key) return IMAGES.hero.url;
  // Support either a full URL (for external images) or a key from IMAGES
  if (key.startsWith("http")) return key;
  const match = (IMAGES as Record<string, { url: string }>)[key];
  return match?.url || IMAGES.hero.url;
}

function parse(path: string, raw: string): BlogPost {
  const { data, content } = matter(raw);
  const slug = slugFromPath(path);
  const html = marked.parse(content, { async: false }) as string;

  return {
    id: slug,
    slug,
    title: String(data.title || slug),
    excerpt: String(data.excerpt || ""),
    content: html,
    category: (data.category || "general") as BlogPost["category"],
    hero_image: resolveHeroImage(data.hero_image),
    published: data.published !== false,
    published_at: data.published_at
      ? new Date(data.published_at).toISOString()
      : new Date().toISOString(),
    seo_title: data.seo_title,
    seo_description: data.seo_description,
  };
}

// Parse once at module load; server-side only, so this runs during SSR boot.
const ALL_POSTS: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .filter((p) => p.published)
  .sort((a, b) => b.published_at.localeCompare(a.published_at));

export async function getBlogPosts(options?: {
  category?: BlogPost["category"];
  limit?: number;
}): Promise<BlogPost[]> {
  let posts = ALL_POSTS;
  if (options?.category) {
    posts = posts.filter((p) => p.category === options.category);
  }
  if (options?.limit) {
    posts = posts.slice(0, options.limit);
  }
  return posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return ALL_POSTS.find((p) => p.slug === slug) || null;
}
