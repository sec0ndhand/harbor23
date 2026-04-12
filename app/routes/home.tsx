import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import { Star, ChevronDown, MapPin, ChevronRight } from "lucide-react";
import { buildMeta, PAGE_META } from "~/lib/seo";
import {
  PROPERTY,
  IMAGES,
  GALLERY,
  STATIC_REVIEWS,
  AMENITIES,
  getLodgingSchema,
} from "~/lib/property-data";
import BookingCTA from "~/components/BookingCTA";
import StarRating from "~/components/StarRating";
import ReviewCard from "~/components/ReviewCard";
import Gallery from "~/components/Gallery";
import { Icon, type IconName } from "~/lib/icons";

export const meta: MetaFunction = () => [
  ...buildMeta(PAGE_META.home),
  {
    "script:ld+json": getLodgingSchema(),
  },
];

export default function Home() {
  const featuredReviews = STATIC_REVIEWS.slice(0, 3);
  const galleryPreview = GALLERY.slice(0, 5);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] flex items-end pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src={`${IMAGES.hero.url}?im_w=1600`}
            alt="Harbor on 23rd — Lake Geneva vacation rental"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="hero-gradient absolute inset-0" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-harbor-gold" fill="currentColor" />
              ))}
            </div>
            <span className="text-white text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
              {PROPERTY.rating} · {PROPERTY.reviewCount} Reviews · Airbnb Guest Favorite
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-3 leading-tight">
            Harbor on 23rd
          </h1>
          <p className="text-harbor-gold font-display italic text-2xl sm:text-3xl mb-2">
            Lake Geneva, Wisconsin
          </p>
          <p className="text-blue-100 text-lg mb-8 max-w-lg leading-relaxed">
            {PROPERTY.tagline} — A spacious 4-bedroom retreat where groups of up to 14 make memories that last a lifetime.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/the-house" className="btn-gold text-base px-7 py-3.5">
              Explore the House
            </Link>
            <a
              href={PROPERTY.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white text-base px-7 py-3.5"
            >
              Check Availability
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </section>

      {/* ── Social Proof Bar ──────────────────────────────────────── */}
      <section className="bg-harbor-blue text-white py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-blue-700">
            {[
              { label: "Guest Rating", value: `${PROPERTY.rating} ★` },
              { label: "Airbnb Reviews", value: `${PROPERTY.reviewCount}+` },
              { label: "Max Guests", value: PROPERTY.maxGuests.toString() },
              { label: "Award", value: "Guest Favorite" },
            ].map((stat) => (
              <div key={stat.label} className="px-4">
                <p className="text-2xl font-bold text-harbor-gold">{stat.value}</p>
                <p className="text-xs text-blue-200 uppercase tracking-widest mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Property Highlights ────────────────────────────────────── */}
      <section className="py-20 bg-harbor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="divider-gold-center" />
            <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
              Everything Your Group Needs
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From sunrise paddle to sunset fire pit — Harbor on 23rd has it all.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(
              [
                { icon: "house", title: `${PROPERTY.bedrooms} Bedrooms`, sub: "Multiple sleeping configurations" },
                { icon: "guests", title: `Sleeps ${PROPERTY.maxGuests}`, sub: "Queen beds & bunk rooms" },
                { icon: "lake-access", title: "Lake Access", sub: "Lake Como — sandy beach & boat launch" },
                { icon: "game-room", title: "Game Room", sub: "Evening entertainment included" },
                { icon: "fire-pit", title: "Fire Pit", sub: "S'mores under the stars" },
                { icon: "gourmet-kitchen", title: "Full Kitchen", sub: "Gas stove, grill & everything you need" },
                { icon: "map-pin", title: "5 Min to Town", sub: "Walk to restaurants, shops & the lake" },
                { icon: "parking", title: "Free Parking", sub: "Garage + driveway fits 5-6 cars" },
              ] satisfies { icon: IconName; title: string; sub: string }[]
            ).map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-50 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <Icon
                  name={item.icon}
                  size={56}
                  className="mx-auto mb-3"
                  decorative
                />
                <h3 className="font-semibold text-harbor-blue text-sm">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Perfect For ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="divider-gold-center" />
            <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
              The Perfect Getaway For…
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Whether you're celebrating, competing, or just reconnecting — Harbor on 23rd was
              made for your group.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                to: "/golf-trips",
                image: IMAGES.backyard.url,
                label: "Golf Trips",
                title: "The Ultimate Golf Weekend",
                description:
                  "World-class courses minutes away. Sleeps 14 golfers comfortably. Fire pit & game room for the 19th hole.",
                tag: "5 courses within 12 miles",
              },
              {
                to: "/bachelorette-party",
                image: IMAGES.patio.url,
                label: "Bachelorette Parties",
                title: "Celebrate in Style",
                description:
                  "Private home. Downtown 5 minutes away. Wine bars, restaurants & boutiques all within reach.",
                tag: "Lake Geneva's #1 bachelorette destination",
              },
              {
                to: "/family-vacation",
                image: IMAGES.living1.url,
                label: "Family Vacations",
                title: "A Home Away From Home",
                description:
                  "Kid-friendly with cribs, toys & a fenced yard. Lake access and family activities all summer.",
                tag: "Perfect for multigenerational groups",
              },
            ].map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative h-56 img-overlay">
                  <img
                    src={`${card.image}?im_w=800`}
                    alt={card.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-4 left-4 bg-harbor-gold text-harbor-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {card.label}
                  </span>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-display text-xl font-semibold text-harbor-blue mb-2 group-hover:text-harbor-gold transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{card.description}</p>
                  <span className="text-xs text-harbor-sage font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {card.tag}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ───────────────────────────────────────── */}
      <section className="py-20 bg-harbor-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
                A Home You'll Never Want to Leave
              </h2>
              <p className="text-gray-500 mt-2">43 photos of your home away from home.</p>
            </div>
            <Link
              to="/the-house"
              className="hidden sm:inline-flex items-center gap-1.5 text-harbor-blue font-medium text-sm hover:text-harbor-gold transition-colors"
            >
              View All Photos
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <Gallery images={galleryPreview} heroLayout />

          <div className="mt-6 text-center sm:hidden">
            <Link to="/the-house" className="btn-primary text-sm">
              View All 43 Photos
            </Link>
          </div>
        </div>
      </section>

      {/* ── About the Property ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4 mb-6">
                Blue Juniper at Lake Geneva
              </h2>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
                <p>
                  Nestled in a quiet neighborhood just five minutes from downtown Lake Geneva,
                  Harbor on 23rd is the kind of home that brings people together. We designed
                  every corner of this spacious 4-bedroom retreat with one goal: to help your
                  group make memories they'll talk about for years.
                </p>
                <p>
                  Whether it's your golf crew debating the back nine around the fire pit, a
                  bachelorette party dancing in the game room, or kids racing through the fenced
                  backyard while dinner simmers on the grill — this is the place where it all
                  happens.
                </p>
                <p>
                  Lake Como access is included during summer months, with a sandy beach and
                  boat launch just minutes away. And when you're ready for some civilization,
                  downtown Lake Geneva's restaurants, wine bars, and lakefront promenade are a
                  5-minute drive.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
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
                <div className="rounded-xl overflow-hidden h-48 img-overlay">
                  <img src={`${IMAGES.kitchen.url}?im_w=600`} alt="Kitchen" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="rounded-xl overflow-hidden h-36 img-overlay">
                  <img src={`${IMAGES.gameRoom.url}?im_w=600`} alt="Game room" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-xl overflow-hidden h-36 img-overlay">
                  <img src={`${IMAGES.firePit.url}?im_w=600`} alt="Fire pit" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="rounded-xl overflow-hidden h-48 img-overlay">
                  <img src={`${IMAGES.bedroom2.url}?im_w=600`} alt="Queen bedroom" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Amenities ─────────────────────────────────────────── */}
      <section className="py-20 bg-harbor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="divider-gold-center" />
            <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
              Stocked & Ready For Your Arrival
            </h2>
            <p className="text-gray-500 mt-3">
              Everything you need for a perfect stay — no extra shopping required.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {AMENITIES.slice(0, 12).map((amenity, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                <span className="text-2xl">{amenity.icon}</span>
                <span className="text-sm font-medium text-gray-700">{amenity.label}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/amenities" className="btn-primary">
              View All {AMENITIES.length}+ Amenities
            </Link>
          </div>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4">
                What Our Guests Say
              </h2>
              <div className="flex items-center gap-3 mt-3">
                <StarRating rating={PROPERTY.rating} size="lg" showNumber />
                <span className="text-gray-500 text-sm">
                  {PROPERTY.reviewCount} reviews · Airbnb Guest Favorite · Top 10% of listings
                </span>
              </div>
            </div>
            <Link
              to="/reviews"
              className="hidden md:inline-flex items-center gap-1.5 text-harbor-blue font-medium text-sm hover:text-harbor-gold transition-colors mt-4 md:mt-0"
            >
              Read All {PROPERTY.reviewCount} Reviews
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} variant="featured" />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/reviews" className="btn-primary text-sm">
              Read All {PROPERTY.reviewCount} Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ── Location ──────────────────────────────────────────────── */}
      <section className="py-20 section-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-4xl font-semibold text-harbor-blue mt-4 mb-6">
                Gateway to Lake Geneva
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Perfectly situated between Chicago and Milwaukee, Lake Geneva has been the
                Midwest's premier resort destination for over 150 years. Harbor on 23rd puts
                you right in the heart of it all.
              </p>
              <div className="space-y-4 mb-8">
                {(
                  [
                    { icon: "map-pin", text: "5 minutes to downtown Lake Geneva" },
                    { icon: "city-skyline", text: "~1 hour north of Chicago" },
                    { icon: "city-skyline", text: "~1 hour south of Milwaukee" },
                    { icon: "lake-access", text: "3 miles to Lake Geneva Public Beach" },
                    { icon: "golf", text: "Minutes from 5 world-class golf courses" },
                  ] satisfies { icon: IconName; text: string }[]
                ).map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-gray-700">
                    <Icon name={item.icon} size={28} decorative />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link to="/location" className="btn-primary">
                Explore the Area
              </Link>
            </div>

            <div className="relative rounded-2xl overflow-hidden h-80 lg:h-96 shadow-xl">
              <img
                src={`${IMAGES.exterior2.url}?im_w=800`}
                alt="Lake Geneva, Wisconsin"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-harbor-blue/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-display text-xl font-semibold">Lake Geneva, Wisconsin</p>
                <p className="text-sm text-blue-200 mt-1">
                  The Midwest's premier resort destination
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <BookingCTA />
    </>
  );
}
