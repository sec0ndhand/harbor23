import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import { Check, ChevronRight } from "lucide-react";
import { buildMeta, PAGE_META } from "~/lib/seo";
import { PROPERTY, IMAGES, GOLF_COURSES, STATIC_REVIEWS, getLodgingSchema } from "~/lib/property-data";
import BookingCTA from "~/components/BookingCTA";
import StarRating from "~/components/StarRating";
import ReviewCard from "~/components/ReviewCard";
import { Icon, type IconName } from "~/lib/icons";

export const meta: MetaFunction = () => [
  ...buildMeta(PAGE_META.golfTrips),
  { "script:ld+json": getLodgingSchema() },
];

const GOLF_FEATURES: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "golf",
    title: "5 Courses Within 12 Miles",
    description:
      "From Arnold Palmer–designed Geneva National to the championship Brute at Grand Geneva, your tee sheet is stacked.",
  },
  {
    icon: "house",
    title: "Sleeps 14 Comfortably",
    description:
      "Multiple room configurations mean every golfer has their own bed. No hotel hallways, no noise complaints.",
  },
  {
    icon: "fire-pit",
    title: "The Perfect 19th Hole",
    description:
      "Settle the bet around the fire pit. Grill steaks on the charcoal BBQ. Replay every birdie in the game room.",
  },
  {
    icon: "gourmet-kitchen",
    title: "Full Kitchen & Grill",
    description:
      "Skip the restaurant bill. The gourmet kitchen and charcoal BBQ grill handle pre-round breakfasts and post-round feasts.",
  },
  {
    icon: "cheers",
    title: "Fridge Stocked Your Way",
    description:
      "Full-size fridge plus a mini fridge. Stock them on arrival and keep the cooler flowing all weekend.",
  },
  {
    icon: "parking",
    title: "Park All the Carts & Cars",
    description:
      "2-car garage plus 3–4 driveway spots. Pull in, unload the bags, and you're home.",
  },
];

const ITINERARY = [
  {
    day: "Day 1",
    title: "Arrive & Tee It Up",
    items: [
      "Check in at 4 PM — keypad entry, no waiting",
      "Unpack and grab cold ones from the fridge",
      "Afternoon round at Abbey Springs (4 miles away)",
      "Grill dinner in the backyard",
      "Fire pit & card games into the night",
    ],
  },
  {
    day: "Day 2",
    title: "The Main Event",
    items: [
      "Big breakfast in the full kitchen",
      "Morning tee time at Grand Geneva — The Brute or Highlands",
      "Lunch at the resort clubhouse",
      "Optional afternoon round at Geneva National",
      "Grill steaks back at the house",
      "Settle the bets. Game room. Fire pit. Repeat.",
    ],
  },
  {
    day: "Day 3",
    title: "One More Round",
    items: [
      "Breakfast burritos before tee time",
      "Round at Hawk's View or Geneva National Course 3",
      "Quick stop in downtown Lake Geneva",
      "Check out by 10 AM — already planning next year",
    ],
  },
];

const golfReviews = STATIC_REVIEWS.filter(
  (r) => r.id === "2" || r.id === "5"
);

export default function GolfTrips() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.backyard.url}
            alt="Golf trip Lake Geneva Wisconsin — Harbor on 23rd"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="hero-gradient absolute inset-0" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-harbor-gold text-harbor-blue text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
            Boys Golf Trip · 90 Minutes From Chicago
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight max-w-4xl">
            The Ultimate Lake Geneva Golf Getaway
          </h1>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl leading-relaxed">
            5 world-class courses within 12 miles. Private home sleeping 14. The 19th hole built
            right in. <strong className="text-white font-semibold">~90 minutes from
            downtown Chicago</strong> — no flights, no rental cars, just hit the road.
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
              { label: "Golf Courses Nearby", value: "5+" },
              { label: "Guests Fit Comfortably", value: "14" },
              { label: "Miles to Grand Geneva", value: "8" },
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

      {/* ── Why it's perfect for golf ───────────────────────────── */}
      <section className="py-20 bg-harbor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="divider-gold-center" />
            <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
              Built for Golf Weekends
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Everything your group needs from the first tee to the last beer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GOLF_FEATURES.map((feature) => (
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

      {/* ── Golf Courses ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4 mb-3">
                World-Class Golf at Your Doorstep
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Lake Geneva is one of the Midwest's premier golf destinations. Five championship
                courses lie within 12 miles of Harbor on 23rd — ranging from Scottish links-style
                layouts to Palmer-designed masterpieces.
              </p>

              <div className="space-y-5">
                {GOLF_COURSES.map((course) => (
                  <div
                    key={course.name}
                    className="flex gap-5 p-5 rounded-xl bg-harbor-cream hover:bg-harbor-warm transition-colors"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-harbor-blue rounded-xl flex items-center justify-center">
                      <Icon name="golf" size={32} decorative />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-harbor-blue">{course.name}</h3>
                        <span className="text-xs bg-harbor-gold/20 text-harbor-blue px-2 py-0.5 rounded-full font-medium">
                          {course.distance}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden h-64 shadow-lg">
                <img
                  src={IMAGES.patio.url}
                  alt="Harbor on 23rd outdoor patio — perfect for post-golf evenings"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden h-40 shadow">
                  <img
                    src={IMAGES.firePit.url}
                    alt="Fire pit at Harbor on 23rd"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-xl overflow-hidden h-40 shadow">
                  <img
                    src={IMAGES.gameRoom.url}
                    alt="Game room"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Quick tip box */}
              <div className="bg-harbor-blue text-white rounded-xl p-6">
                <p className="text-harbor-gold font-semibold text-sm uppercase tracking-widest mb-2">
                  Pro Tip
                </p>
                <p className="text-sm leading-relaxed">
                  Tee times at Grand Geneva and Geneva National fill up fast in summer —
                  book at least 2 weeks in advance. We're happy to share the best contact
                  info after you reserve the house.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sample Itinerary ─────────────────────────────────────── */}
      <section className="py-20 bg-harbor-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="divider-gold-center" />
            <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
              A Sample 3-Day Golf Weekend
            </h2>
            <p className="text-gray-500 mt-3">
              Here's how your group's weekend might look — adjust to your own ambition level.
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

      {/* ── Reviews from golfers ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
                Golf Groups Love It Here
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
            {golfReviews.map((review) => (
              <ReviewCard key={review.id} review={review} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <BookingCTA
        heading="Ready to Plan Your Golf Trip?"
        subtext="Harbor on 23rd fills up fast for summer weekends. Lock in your dates now."
      />
    </>
  );
}
