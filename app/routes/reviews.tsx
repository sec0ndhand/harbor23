import { data } from "react-router";
import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { Star, ExternalLink } from "lucide-react";
import { buildMeta, PAGE_META } from "~/lib/seo";
import { PROPERTY, STATIC_REVIEWS } from "~/lib/property-data";
import { getReviews } from "~/lib/pocketbase.server";
import StarRating from "~/components/StarRating";
import ReviewCard from "~/components/ReviewCard";
import BookingCTA from "~/components/BookingCTA";
import type { Review } from "~/lib/types";

export const meta: MetaFunction = () => [
  ...buildMeta(PAGE_META.reviews),
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name: PROPERTY.name,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: PROPERTY.rating,
        reviewCount: PROPERTY.reviewCount,
        bestRating: 5,
      },
      review: STATIC_REVIEWS.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
        reviewBody: r.content,
        datePublished: r.date,
      })),
    },
  },
];

export async function loader() {
  const pbReviews = await getReviews(30);
  return data({ pbReviews });
}

const RATING_CATEGORIES = [
  { label: "Cleanliness", score: 5.0 },
  { label: "Accuracy", score: 4.9 },
  { label: "Communication", score: 5.0 },
  { label: "Location", score: 4.9 },
  { label: "Check-in", score: 5.0 },
  { label: "Value", score: 4.8 },
];

export default function Reviews() {
  const { pbReviews } = useLoaderData<typeof loader>();
  const allReviews: Review[] = [...STATIC_REVIEWS, ...pbReviews];

  return (
    <>
      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="bg-harbor-blue text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-harbor-gold text-harbor-blue text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              Guest Reviews
            </span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold mb-4">
              What Our Guests Say
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed">
              Rated {PROPERTY.rating} out of 5 by {PROPERTY.reviewCount}+ guests on Airbnb.
              An Airbnb Guest Favorite — top 10% of all listings.
            </p>
          </div>
        </div>
      </section>

      {/* ── Aggregate Ratings ────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Overall score */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-5 mb-4">
                <span className="font-display text-7xl font-bold text-harbor-blue">
                  {PROPERTY.rating}
                </span>
                <div>
                  <StarRating rating={PROPERTY.rating} size="lg" />
                  <p className="text-gray-500 text-sm mt-1">out of 5</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Based on <strong>{PROPERTY.reviewCount}+ reviews</strong> on Airbnb
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-harbor-gold/10 text-harbor-blue px-4 py-2 rounded-full text-sm font-semibold">
                <Star className="w-4 h-4 text-harbor-gold" fill="currentColor" />
                Airbnb Guest Favorite · Top 10%
              </div>
            </div>

            {/* Category breakdown */}
            <div className="space-y-3">
              {RATING_CATEGORIES.map((cat) => (
                <div key={cat.label} className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 w-28 flex-shrink-0">{cat.label}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-harbor-gold rounded-full h-2"
                      style={{ width: `${(cat.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-harbor-blue w-8 text-right">
                    {cat.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Review Grid ──────────────────────────────────────────── */}
      <section className="py-20 bg-harbor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="font-display text-3xl font-semibold text-harbor-blue">
              All Reviews ({allReviews.length})
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Verified stays from our Airbnb listing and direct guests.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Airbnb CTA ───────────────────────────────────────────── */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Want to read even more reviews? See the full listing on Airbnb.
          </p>
          <a
            href={PROPERTY.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Read All {PROPERTY.reviewCount}+ Reviews on Airbnb
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
