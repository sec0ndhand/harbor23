import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import { Check, ChevronRight } from "lucide-react";
import { buildMeta, PAGE_META } from "~/lib/seo";
import { PROPERTY, IMAGES, ATTRACTIONS, STATIC_REVIEWS, getLodgingSchema } from "~/lib/property-data";
import BookingCTA from "~/components/BookingCTA";
import StarRating from "~/components/StarRating";
import ReviewCard from "~/components/ReviewCard";
import { Icon, type IconName } from "~/lib/icons";

export const meta: MetaFunction = () => [
  ...buildMeta(PAGE_META.bachelorette),
  { "script:ld+json": getLodgingSchema() },
];

const BACH_FEATURES: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "champagne-toast",
    title: "Your Own Private Estate",
    description:
      "No shared walls, no hotel lobbies, no strangers. Harbor on 23rd is exclusively yours — all 4 bedrooms for your crew.",
  },
  {
    icon: "game-room",
    title: "Built-In Entertainment",
    description:
      "Game room, fire pit, outdoor patio, and a huge dining table. Every phase of the evening, covered.",
  },
  {
    icon: "wine-dining",
    title: "Wine & Dine Downtown",
    description:
      "Lake Geneva Winery, rooftop bars, gourmet restaurants — all 5 minutes away. Mornings at the house, evenings on the town.",
  },
  {
    icon: "lake-access",
    title: "Lake Access Included",
    description:
      "Lake Como's sandy beach and boat launch are available all summer. Golden hour by the water hits different when you're celebrating.",
  },
  {
    icon: "bedroom",
    title: "Luxury Beds for Every Guest",
    description:
      "Three queen beds plus bunk options. Everyone has their own space to glam up and wind down. No air mattresses here.",
  },
  {
    icon: "sparkle",
    title: "Spa & Pampering Nearby",
    description:
      "The Abbey Resort's Avani Spa is 10 minutes away. Add a spa day to your itinerary for the full bachelorette experience.",
  },
];

const DOWNTOWN_HIGHLIGHTS = [
  { name: "Lake Geneva Winery", type: "Wine Tasting", note: "8 min drive" },
  { name: "Pier 290 Restaurant & Marina", type: "Waterfront Dining", note: "10 min drive" },
  { name: "Geneva Lake Spa", type: "Spa Day", note: "5 min drive" },
  { name: "Downtown Boutique Shopping", type: "Shopping", note: "5 min drive" },
  { name: "The Abbey Resort & Avani Spa", type: "Luxury Spa", note: "10 min drive" },
  { name: "Lakefront Promenade & Boat Tours", type: "Water Activities", note: "5 min drive" },
  { name: "Ristoranté Brissago at Grand Geneva", type: "Fine Dining", note: "8 min drive" },
  { name: "Lake Geneva Cruise Line", type: "Sightseeing Boat Tour", note: "5 min drive" },
];

const ITINERARY = [
  {
    day: "Friday",
    title: "Arrive & Celebrate",
    items: [
      "Check in at 4 PM — sip rosé while the squad arrives",
      "Get glam and take photos at the house",
      "Head downtown for dinner and drinks",
      "Come home to the fire pit for late-night chats",
    ],
  },
  {
    day: "Saturday",
    title: "The Full Experience",
    items: [
      "Brunch at the house — big table seats everyone",
      "Spa morning at The Abbey or Geneva Lake Spa",
      "Afternoon on the lake (beach, boat tour, or wine tasting)",
      "Dinner reservation at a lakefront restaurant",
      "Game room & party mode back at the house",
    ],
  },
  {
    day: "Sunday",
    title: "Unwind & Head Home",
    items: [
      "Slow morning with coffee and leftover pastries",
      "Optional stroll through downtown shops",
      "Check out by 10 AM with memories that'll outlast the hangover",
    ],
  },
];

const bachReviews = STATIC_REVIEWS.filter((r) => r.id === "1" || r.id === "4");

export default function BachelorettePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.patio.url}
            alt="Bachelorette party Lake Geneva — Harbor on 23rd"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="hero-gradient absolute inset-0" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-harbor-gold text-harbor-blue text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
            Bachelorette Party · 90 Minutes From Chicago
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight max-w-4xl">
            The Bachelorette Weekend She Deserves
          </h1>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl leading-relaxed">
            Private 4-bedroom home. Fire pit. Lake access. Downtown 5 minutes away.
            <strong className="text-white font-semibold"> ~90 minutes from downtown Chicago</strong> —
            skip the Nashville flights and make it a whole-weekend lake house party.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={PROPERTY.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-base px-8 py-4"
            >
              Check Availability on Airbnb
            </a>
            <Link to="/book" className="btn-outline-white text-base px-8 py-4">
              Send an Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────── */}
      <section className="bg-harbor-blue text-white py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-blue-700">
            {[
              { label: "Private Bedrooms", value: "4" },
              { label: "Guests Fit Comfortably", value: "14" },
              { label: "Minutes to Downtown", value: "5" },
              { label: "Airbnb Rating", value: `${PROPERTY.rating} ★` },
            ].map((stat) => (
              <div key={stat.label} className="px-4">
                <p className="text-2xl font-bold text-harbor-gold">{stat.value}</p>
                <p className="text-xs text-blue-200 uppercase tracking-widest mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Harbor on 23rd ──────────────────────────────────── */}
      <section className="py-20 bg-harbor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="divider-gold-center" />
            <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
              Everything a Bachelorette Weekend Needs
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We've hosted dozens of bachelorette parties. Here's why they keep coming back.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BACH_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-50 hover:shadow-md transition-shadow"
              >
                <Icon name={feature.icon} size={64} className="mb-4" decorative />
                <h3 className="font-display text-xl font-semibold text-harbor-blue mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Downtown Lake Geneva ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4 mb-3">
                Lake Geneva: The Perfect Bachelorette Town
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Lake Geneva isn't just scenic — it's stacked with wine bars, boutique shops,
                spa resorts, and lakefront dining. It's a bachelorette destination that feels
                luxurious without the chaos of a big city. Just 5 minutes from Harbor on 23rd.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {DOWNTOWN_HIGHLIGHTS.map((item) => (
                  <div
                    key={item.name}
                    className="flex gap-3 p-4 rounded-xl bg-harbor-cream hover:bg-harbor-warm transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-harbor-gold/20 rounded-lg flex items-center justify-center text-harbor-gold text-sm">
                      ✦
                    </div>
                    <div>
                      <p className="font-semibold text-harbor-blue text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.type} · {item.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden h-72 shadow-lg">
                <img
                  src={IMAGES.living1.url}
                  alt="Harbor on 23rd living room — perfect for bachelorette parties"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden h-44 shadow">
                  <img
                    src={IMAGES.firePit.url}
                    alt="Fire pit"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-xl overflow-hidden h-44 shadow">
                  <img
                    src={IMAGES.dining.url}
                    alt="Dining area"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sample Weekend Itinerary ─────────────────────────────── */}
      <section className="py-20 bg-harbor-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="divider-gold-center" />
            <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
              A Perfect Bachelorette Weekend
            </h2>
            <p className="text-gray-500 mt-3">
              Here's how your weekend could unfold — every group makes it their own.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {ITINERARY.map((day, idx) => (
              <div key={day.day} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-harbor-gold flex items-center justify-center text-harbor-blue font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-xs text-harbor-gold font-semibold uppercase tracking-widest">
                      {day.day}
                    </p>
                    <h3 className="font-display text-lg font-semibold text-harbor-blue">
                      {day.title}
                    </h3>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {day.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check
                        className="w-4 h-4 text-harbor-gold mt-0.5 flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
                Brides & Their Squads Love It Here
              </h2>
              <div className="flex items-center gap-3 mt-3">
                <StarRating rating={PROPERTY.rating} size="lg" showNumber />
                <span className="text-gray-500 text-sm">
                  {PROPERTY.reviewCount} Airbnb reviews · Guest Favorite
                </span>
              </div>
            </div>
            <Link
              to="/reviews"
              className="hidden md:inline-flex items-center gap-1.5 text-harbor-blue font-medium text-sm hover:text-harbor-gold transition-colors mt-4 md:mt-0"
            >
              Read All Reviews
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {bachReviews.map((review) => (
              <ReviewCard key={review.id} review={review} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* ── House rules note ─────────────────────────────────────── */}
      <section className="py-12 bg-harbor-blue">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <p className="text-harbor-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Good to Know
          </p>
          <p className="text-blue-100 leading-relaxed">
            Harbor on 23rd is a private residential home in a quiet neighborhood. We welcome
            bachelorette groups warmly — there's plenty of space to celebrate inside and in the
            backyard. Quiet hours begin at 10 PM and no large outside gatherings are permitted.
            Max occupancy is 14 guests.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <BookingCTA
        heading="Ready to Celebrate?"
        subtext="Summer and fall weekends fill quickly. Secure your dates and start planning the perfect bachelorette weekend."
      />
    </>
  );
}
