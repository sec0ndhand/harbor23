import { data } from "react-router";
import type { MetaFunction } from "react-router";
import { useLoaderData, Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { buildMeta, PAGE_META } from "~/lib/seo";
import { getBlogPosts } from "~/lib/blog";
import type { BlogPost } from "~/lib/types";

export const meta: MetaFunction = () => buildMeta(PAGE_META.blog);

export async function loader() {
  const posts = await getBlogPosts({ limit: 20 });
  return data({ posts });
}

const CATEGORY_LABELS: Record<BlogPost["category"], string> = {
  golf: "Golf",
  bachelorette: "Bachelorette",
  family: "Family",
  general: "Travel Tips",
  local: "Lake Geneva",
};

const CATEGORY_COLORS: Record<BlogPost["category"], string> = {
  golf: "bg-green-100 text-green-800",
  bachelorette: "bg-pink-100 text-pink-800",
  family: "bg-blue-100 text-blue-800",
  general: "bg-gray-100 text-gray-700",
  local: "bg-harbor-gold/20 text-harbor-blue",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <>
      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="bg-harbor-blue text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-harbor-gold text-harbor-blue text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              Travel Blog
            </span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold mb-4">
              Lake Geneva Travel Guide
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed">
              Tips, itineraries, and local guides for golf trips, bachelorette weekends,
              family vacations, and more. Written by the hosts of Harbor on 23rd.
            </p>
          </div>
        </div>
      </section>

      {/* ── Blog Grid ────────────────────────────────────────────── */}
      <section className="py-20 bg-harbor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const category = post.category;

  return (
    <Link to={`/blog/${post.slug}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
        <div className="relative h-52 overflow-hidden">
          <img
            src={post.hero_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <span
            className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${CATEGORY_COLORS[category]}`}
          >
            {CATEGORY_LABELS[category]}
          </span>
        </div>
        <div className="p-6">
          <p className="text-xs text-gray-400 mb-2">{formatDate(post.published_at)}</p>
          <h2 className="font-display text-lg font-semibold text-harbor-blue mb-2 group-hover:text-harbor-gold transition-colors leading-snug">
            {post.title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-harbor-blue text-sm font-medium hover:text-harbor-gold transition-colors">
            Read more
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
