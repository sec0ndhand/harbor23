import { data } from "react-router";
import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData, Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { buildMeta, PAGE_META } from "~/lib/seo";
import { getBlogPosts } from "~/lib/pocketbase.server";
import { IMAGES } from "~/lib/property-data";
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

// Placeholder posts shown when PocketBase has no content yet
const PLACEHOLDER_POSTS = [
  {
    id: "p1",
    title: "Best Golf Courses Near Lake Geneva, Wisconsin",
    slug: null,
    excerpt:
      "From the championship Brute at Grand Geneva to the Arnold Palmer–designed Geneva National, here's how to plan your perfect Lake Geneva golf trip.",
    category: "golf" as BlogPost["category"],
    hero_image: IMAGES.backyard.url,
    published_at: "Coming soon",
  },
  {
    id: "p2",
    title: "The Ultimate Bachelorette Party Guide to Lake Geneva",
    slug: null,
    excerpt:
      "Wine tastings, spa days, lakefront dinners — here's everything you need to plan the ultimate bachelorette weekend in Lake Geneva, WI.",
    category: "bachelorette" as BlogPost["category"],
    hero_image: IMAGES.patio.url,
    published_at: "Coming soon",
  },
  {
    id: "p3",
    title: "10 Best Things to Do With Kids in Lake Geneva",
    slug: null,
    excerpt:
      "Mini golf, lake cruises, the shore path, ice cream — a local's guide to keeping the whole family entertained in Lake Geneva.",
    category: "family" as BlogPost["category"],
    hero_image: IMAGES.living1.url,
    published_at: "Coming soon",
  },
  {
    id: "p4",
    title: "Lake Geneva in Every Season: What to Expect Year-Round",
    slug: null,
    excerpt:
      "Ski hills in winter, beach days in summer, fall foliage in autumn — Lake Geneva is a four-season destination worth visiting any time.",
    category: "local" as BlogPost["category"],
    hero_image: IMAGES.exterior2.url,
    published_at: "Coming soon",
  },
  {
    id: "p5",
    title: "How to Plan the Perfect Lake Geneva Weekend Trip",
    slug: null,
    excerpt:
      "Packing tips, where to eat, what to see, and how to make the most of a 2–3 day escape to Lake Geneva, Wisconsin.",
    category: "general" as BlogPost["category"],
    hero_image: IMAGES.firePit.url,
    published_at: "Coming soon",
  },
  {
    id: "p6",
    title: "Geneva National vs. Grand Geneva: Which Course Should You Play?",
    slug: null,
    excerpt:
      "A detailed comparison of Lake Geneva's two premier golf resorts to help your group decide where to tee it up.",
    category: "golf" as BlogPost["category"],
    hero_image: IMAGES.gameRoom.url,
    published_at: "Coming soon",
  },
];

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();
  const hasRealPosts = posts.length > 0;
  const displayPosts = hasRealPosts ? posts : PLACEHOLDER_POSTS;

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
          {!hasRealPosts && (
            <div className="mb-10 bg-white rounded-xl px-6 py-4 border border-gray-100 text-sm text-gray-500 flex items-center gap-3">
              <span className="text-xl">✍️</span>
              <span>
                Blog posts are managed via PocketBase. Connect your CMS to publish articles.
                Below is a preview of planned content.
              </span>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post) => (
              <PostCard key={post.id} post={post} isPlaceholder={!hasRealPosts} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PostCard({
  post,
  isPlaceholder,
}: {
  post: (typeof PLACEHOLDER_POSTS)[0] | BlogPost;
  isPlaceholder: boolean;
}) {
  const category = post.category as BlogPost["category"];
  const imageUrl = "hero_image" in post ? post.hero_image : "";
  const publishedAt = "published_at" in post ? post.published_at : "";

  const cardContent = (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
      <div className="relative h-52 overflow-hidden">
        <img
          src={`${imageUrl}?im_w=600`}
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
        <p className="text-xs text-gray-400 mb-2">{publishedAt}</p>
        <h2 className="font-display text-lg font-semibold text-harbor-blue mb-2 group-hover:text-harbor-gold transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
        {!isPlaceholder && (
          <span className="mt-4 inline-flex items-center gap-1 text-harbor-blue text-sm font-medium hover:text-harbor-gold transition-colors">
            Read more
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        )}
        {isPlaceholder && (
          <span className="mt-4 inline-block text-xs text-gray-300 font-medium">
            Coming soon
          </span>
        )}
      </div>
    </div>
  );

  if (!isPlaceholder && "slug" in post && post.slug) {
    return <Link to={`/blog/${post.slug}`}>{cardContent}</Link>;
  }

  return <div>{cardContent}</div>;
}
