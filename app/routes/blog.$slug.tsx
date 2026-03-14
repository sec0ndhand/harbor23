import { data } from "react-router";
import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData, Link } from "react-router";
import { getBlogPost } from "~/lib/pocketbase.server";
import { buildMeta } from "~/lib/seo";
import { PROPERTY } from "~/lib/property-data";
import BookingCTA from "~/components/BookingCTA";

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const post = await getBlogPost(slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return data({ post });
}

export const meta: MetaFunction<typeof loader> = ({ data: loaderData }) => {
  if (!loaderData?.post) return [{ title: "Post Not Found" }];
  const { post } = loaderData;

  return buildMeta({
    title: post.seo_title || `${post.title} | ${PROPERTY.name} Blog`,
    description: post.seo_description || post.excerpt,
    canonical: `/blog/${post.slug}`,
    ogImage: post.hero_image || undefined,
  });
};

const CATEGORY_LABELS = {
  golf: "Golf",
  bachelorette: "Bachelorette",
  family: "Family",
  general: "Travel Tips",
  local: "Lake Geneva",
};

const CATEGORY_COLORS = {
  golf: "bg-green-100 text-green-800",
  bachelorette: "bg-pink-100 text-pink-800",
  family: "bg-blue-100 text-blue-800",
  general: "bg-gray-100 text-gray-700",
  local: "bg-harbor-gold/20 text-harbor-blue",
};

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();
  const category = post.category as keyof typeof CATEGORY_LABELS;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      {post.hero_image && (
        <section className="relative h-[55vh] min-h-[400px] flex items-end pb-16">
          <div className="absolute inset-0 z-0">
            <img
              src={`${post.hero_image}?im_w=1400`}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="hero-gradient absolute inset-0" />
          </div>
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className={`inline-block text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 ${CATEGORY_COLORS[category]}`}>
              {CATEGORY_LABELS[category]}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
            <p className="text-blue-200 mt-3 text-sm">
              Published {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
              {" · "}
              Harbor on 23rd
            </p>
          </div>
        </section>
      )}

      {/* ── No hero fallback header ──────────────────────────────── */}
      {!post.hero_image && (
        <section className="bg-harbor-blue text-white pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className={`inline-block text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 ${CATEGORY_COLORS[category]}`}>
              {CATEGORY_LABELS[category]}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">{post.title}</h1>
            <p className="text-blue-200 text-sm">
              Published {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
            </p>
          </div>
        </section>
      )}

      {/* ── Article Body ─────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Excerpt lead */}
          {post.excerpt && (
            <p className="text-lg text-gray-600 leading-relaxed mb-8 border-l-4 border-harbor-gold pl-6 italic">
              {post.excerpt}
            </p>
          )}

          {/* Rich text content from PocketBase editor */}
          <div
            className="prose prose-lg prose-harbor max-w-none
              prose-headings:font-display prose-headings:text-harbor-blue
              prose-a:text-harbor-gold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-harbor-blue
              prose-blockquote:border-harbor-gold prose-blockquote:text-gray-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-harbor-blue font-medium text-sm hover:text-harbor-gold transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
