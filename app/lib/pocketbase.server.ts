import PocketBase from "pocketbase";
import type { BlogPost, Review, Inquiry } from "./types";

const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://localhost:8090";

let _pb: PocketBase | null = null;

function getPB(): PocketBase {
  if (!_pb) {
    _pb = new PocketBase(POCKETBASE_URL);
    _pb.autoCancellation(false);
  }
  return _pb;
}

// ── Blog Posts ───────────────────────────────────────────────────────────────

export async function getBlogPosts(options?: {
  category?: BlogPost["category"];
  limit?: number;
}): Promise<BlogPost[]> {
  try {
    const pb = getPB();
    const filter = ["published=true", options?.category ? `category="${options.category}"` : ""]
      .filter(Boolean)
      .join(" && ");

    const records = await pb.collection("blog_posts").getList(1, options?.limit ?? 20, {
      filter,
      sort: "-published_at",
    });

    return records.items as unknown as BlogPost[];
  } catch {
    // PocketBase not available — return empty array gracefully
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const pb = getPB();
    const record = await pb.collection("blog_posts").getFirstListItem(`slug="${slug}"`);
    return record as unknown as BlogPost;
  } catch {
    return null;
  }
}

// ── Reviews ──────────────────────────────────────────────────────────────────

export async function getReviews(limit = 20): Promise<Review[]> {
  try {
    const pb = getPB();
    const records = await pb.collection("reviews").getList(1, limit, {
      sort: "-date",
    });
    return records.items as unknown as Review[];
  } catch {
    return [];
  }
}

// ── Inquiries ────────────────────────────────────────────────────────────────

export async function createInquiry(data: Inquiry): Promise<{ success: boolean; error?: string }> {
  try {
    const pb = getPB();
    await pb.collection("inquiries").create(data);
    return { success: true };
  } catch (err) {
    console.error("Failed to save inquiry:", err);
    return { success: false, error: "Failed to submit inquiry. Please try again." };
  }
}

/**
 * PocketBase Collection Setup Instructions
 * ─────────────────────────────────────────
 * Create these collections in your PocketBase admin (https://your-pb-url/_/):
 *
 * 1. blog_posts
 *    Fields: title(text), slug(text,unique), excerpt(text), content(editor),
 *            category(select:golf|bachelorette|family|general|local),
 *            hero_image(file), published(bool), published_at(date),
 *            seo_title(text), seo_description(text)
 *
 * 2. reviews
 *    Fields: author(text), rating(number), date(text), content(text),
 *            platform(select:airbnb|google|direct), avatar(url,optional)
 *
 * 3. inquiries
 *    Fields: name(text), email(email), phone(text,optional),
 *            message(text), check_in(date,optional), check_out(date,optional),
 *            guests(number,optional),
 *            event_type(select:golf|bachelorette|family|other)
 *
 * Set inquiries collection to allow create from public (no auth required).
 * Set blog_posts + reviews to allow read from public.
 */
