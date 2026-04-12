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
  ...buildMeta(PAGE_META.family),
  { "script:ld+json": getLodgingSchema() },
];

const FAMILY_FEATURES: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "crib",
    title: "Baby & Toddler Ready",
    description:
      "Pack 'n play, crib, high chair, children's dinnerware, and toys for ages 0–10. Arrive with the kids — we've got the rest.",
  },
  {
    icon: "fenced-backyard",
    title: "Fully Fenced Backyard",
    description:
      "Kids can run, play, and explore the fenced yard while grown-ups relax on the patio. Safe and spacious.",
  },
  {
    icon: "bedroom",
    title: "Sleeping Configurations for All Ages",
    description:
      "Three queen beds, bunk rooms (kids love them), and a couch sleeper. Every family member has their own comfortable spot.",
  },
  {
    icon: "lake-access",
    title: "Lake Access All Summer",
    description:
      "Lake Como's sandy beach and boat launch are available during summer months. Build sandcastles, launch kayaks, soak it all in.",
  },
  {
    icon: "game-room",
    title: "Rainy Day? No Problem.",
    description:
      "Game room, board games, puzzles, books, and toys keep kids (and adults) entertained on cloudy days.",
  },
  {
    icon: "gourmet-kitchen",
    title: "Cook Your Own Family Meals",
    description:
      "The full kitchen with a gas stove, big dining table, and charcoal grill means home-cooked family dinners at a fraction of restaurant prices.",
  },
];

const FAMILY_ACTIVITIES: { icon: IconName; name: string; age: string; note: string }[] = [
  {
    name: "Lake Como Beach",
    age: "All ages",
    note: "Included with rental",
    icon: "private-beach",
  },
  {
    name: "Hillmoor Golf Park (mini golf, batting cages)",
    age: "Ages 4+",
    note: "5 min drive",
    icon: "golf",
  },
  {
    name: "Lake Geneva Cruise Line",
    age: "All ages",
    note: "5 min drive",
    icon: "boat-tour",
  },
  {
    name: "Geneva Lake Shore Path",
    age: "All ages",
    note: "21-mile public path",
    icon: "walking-path",
  },
  {
    name: "Downtown Lake Geneva Ice Cream & Shops",
    age: "All ages",
    note: "5 min drive",
    icon: "ice-cream",
  },
  {
    name: "Yerkes Observatory",
    age: "Ages 6+",
    note: "15 min drive",
    icon: "observatory",
  },
  {
    name: "Grand Geneva Ski & Snow Tubing (winter)",
    age: "Ages 5+",
    note: "8 min drive",
    icon: "skiing",
  },
  {
    name: "Alpine Valley Music Theatre",
    age: "All ages",
    note: "20 min drive",
    icon: "live-music",
  },
];

const ITINERARY = [
  {
    day: "Day 1",
    title: "Settle In",
    items: [
      "Check in at 4 PM — kids claim the bunk beds first",
      "Unpack and explore the house",
      "Backyard playtime while adults set up",
      "Grill dinner on the charcoal BBQ",
      "Family game night: board games & puzzles",
    ],
  },
  {
    day: "Day 2",
    title: "Lake Day",
    items: [
      "Big family breakfast in the kitchen",
      "Morning at Lake Como beach — swimming & sandcastles",
      "Lunch on the patio",
      "Afternoon: Lake Geneva cruise or mini golf",
      "Ice cream downtown before dinner",
      "Fire pit & s'mores before bed",
    ],
  },
  {
    day: "Day 3",
    title: "Explore & Head Home",
    items: [
      "Slow morning — pancakes, coffee, no rush",
      "Short walk along the Geneva Lake Shore Path",
      "Browse downtown shops & grab lunch",
      "Check out by 10 AM — already planning the next trip",
    ],
  },
];

const familyReviews = STATIC_REVIEWS.filter((r) => r.id === "3" || r.id === "6");

export default function FamilyVacation() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.living1.url}
            alt="Family vacation Lake Geneva Wisconsin — Harbor on 23rd"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="hero-gradient absolute inset-0" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-harbor-gold text-harbor-blue text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
            Family Vacation · 90 Minutes From Chicago
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight max-w-4xl">
            A Family Vacation They'll Never Forget
          </h1>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl leading-relaxed">
            Kid-friendly from day one. Crib, toys, fenced yard, bunk beds, and lake access.
            <strong className="text-white font-semibold"> ~90 minutes from downtown Chicago</strong> —
            no flights, no airport meltdowns, just load the car and go.
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
              { label: "Bedrooms", value: "4" },
              { label: "Total Guests", value: "14" },
              { label: "To Downtown", value: "5 min" },
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

      {/* ── Family Features ──────────────────────────────────────── */}
      <section className="py-20 bg-harbor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="divider-gold-center" />
            <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
              Designed With Families in Mind
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We've thought through everything so you don't have to — from the youngest toddler to grandparents.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FAMILY_FEATURES.map((feature) => (
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

      {/* ── House photos + description ───────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4 mb-6">
                The House That Grows With Your Family
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
                <p>
                  Multigenerational trips are our specialty. Harbor on 23rd sleeps up to 14
                  guests across four bedrooms — kids pile into the bunk rooms while parents
                  and grandparents each have their own queen bed and private space.
                </p>
                <p>
                  The open-plan kitchen and dining area keeps everyone connected at mealtimes.
                  The large dining table seats the whole family, and the gas stove handles
                  even the biggest breakfasts.
                </p>
                <p>
                  When the kids need to burn energy, the fully fenced backyard has space to
                  run. When they need to wind down, the board games, books, and toys are always
                  within reach.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {(
                  [
                    { icon: "crib", label: "Crib & Pack 'n Play" },
                    { icon: "toys", label: "Toys & Books" },
                    { icon: "fenced-backyard", label: "Fenced Backyard" },
                    { icon: "bedroom", label: "Bunk Rooms Kids Love" },
                    { icon: "gourmet-kitchen", label: "Full Kitchen" },
                    { icon: "lake-access", label: "Lake Access Included" },
                  ] satisfies { icon: IconName; label: string }[]
                ).map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <Icon name={item.icon} size={28} decorative />
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <Link to="/the-house" className="btn-primary">
                  Tour the House
                </Link>
                <Link to="/amenities" className="btn-outline-white border-harbor-blue text-harbor-blue hover:bg-harbor-blue hover:text-white">
                  See All Amenities
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden h-48">
                  <img
                    src={IMAGES.bedroom1.url}
                    alt="Bunk beds — kids' favorite"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-xl overflow-hidden h-36">
                  <img
                    src={IMAGES.backyard.url}
                    alt="Fenced backyard"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-xl overflow-hidden h-36">
                  <img
                    src={IMAGES.dining.url}
                    alt="Large dining table for the whole family"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-xl overflow-hidden h-48">
                  <img
                    src={IMAGES.kitchen.url}
                    alt="Full kitchen"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Family Activities ────────────────────────────────────── */}
      <section className="py-20 bg-harbor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="divider-gold-center" />
            <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
              Things to Do With the Whole Family
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Lake Geneva has been a family destination for over 150 years — and for good reason.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FAMILY_ACTIVITIES.map((activity) => (
              <div
                key={activity.name}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <Icon name={activity.icon} size={48} className="mb-3" decorative />
                <h3 className="font-semibold text-harbor-blue text-sm mb-1">{activity.name}</h3>
                <p className="text-xs text-harbor-sage font-medium">{activity.age}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample Itinerary ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="divider-gold-center" />
            <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
              A Sample 3-Day Family Trip
            </h2>
            <p className="text-gray-500 mt-3">
              Adjust the pace to fit your family — Harbor on 23rd works for all speeds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {ITINERARY.map((day, idx) => (
              <div key={day.day} className="bg-harbor-cream rounded-2xl p-8">
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
      <section className="py-20 bg-harbor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
                Families Come Back Year After Year
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
            {familyReviews.map((review) => (
              <ReviewCard key={review.id} review={review} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <BookingCTA
        heading="Give Your Family the Vacation They Deserve"
        subtext="Summer weekends go fast. Lock in your dates and start counting down the days."
      />
    </>
  );
}
