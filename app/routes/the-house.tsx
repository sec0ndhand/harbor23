import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { buildMeta, PAGE_META } from "~/lib/seo";
import { PROPERTY, GALLERY, BEDROOMS, IMAGES } from "~/lib/property-data";
import Gallery from "~/components/Gallery";
import BookingCTA from "~/components/BookingCTA";
import StarRating from "~/components/StarRating";
import { Icon, type IconName } from "~/lib/icons";

export const meta: MetaFunction = () => buildMeta(PAGE_META.theHouse);

export default function TheHouse() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="relative pt-20 pb-8 bg-harbor-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <span className="divider-gold" />
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-3">
            The House
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Four bedrooms. Three bathrooms. One unforgettable retreat. Explore every corner of
            Harbor on 23rd below.
          </p>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <StarRating rating={PROPERTY.rating} size="sm" showNumber />
            <span className="text-blue-300 text-sm">
              {PROPERTY.reviewCount} reviews · Airbnb Guest Favorite
            </span>
          </div>
        </div>
      </div>

      {/* ── Property Stats Bar ────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 overflow-x-auto gap-8">
            {[
              { label: "Bedrooms", value: PROPERTY.bedrooms.toString() },
              { label: "Bathrooms", value: PROPERTY.bathrooms.toString() },
              { label: "Max Guests", value: PROPERTY.maxGuests.toString() },
              { label: "Beds", value: PROPERTY.beds.toString() },
              { label: "Check-in", value: PROPERTY.checkIn },
              { label: "Check-out", value: PROPERTY.checkOut },
            ].map((s) => (
              <div key={s.label} className="flex-shrink-0 text-center">
                <p className="text-sm font-bold text-harbor-blue">{s.value}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            ))}
            <a
              href={PROPERTY.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 btn-gold text-sm py-2 px-5"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>

      {/* ── Photo Gallery ─────────────────────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-harbor-blue mb-8">
            All Photos ({GALLERY.length})
          </h2>
          <Gallery images={GALLERY} />
        </div>
      </section>

      {/* ── Full Description ──────────────────────────────────────── */}
      <section className="py-16 bg-harbor-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="divider-gold" />
          <h2 className="font-display text-3xl font-semibold text-harbor-blue mt-4 mb-6">
            About This Home
          </h2>
          <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed space-y-5">
            {PROPERTY.fullDescription.split("\n\n").map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
          </div>
          <div className="mt-6 p-5 bg-harbor-blue/10 rounded-xl border-l-4 border-harbor-gold">
            <p className="text-sm font-semibold text-harbor-blue mb-1 flex items-center gap-2">
              <Icon name="lake-access" size={24} decorative />
              Lake Access
            </p>
            <p className="text-sm text-gray-600">{PROPERTY.lakeAccessNote}</p>
          </div>
        </div>
      </section>

      {/* ── Bedrooms ──────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="divider-gold" />
          <h2 className="font-display text-3xl font-semibold text-harbor-blue mt-4 mb-10">
            Sleeping Arrangements
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BEDROOMS.map((room, i) => (
              <div key={i} className="card">
                <div className="h-48 img-overlay">
                  <img
                    src={room.image.url}
                    alt={room.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-harbor-blue text-lg">{room.name}</h3>
                  <p className="text-gray-500 text-sm mt-1 flex items-center gap-1.5">
                    <Icon name="bedroom" size={18} decorative /> {room.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-400 mt-6 text-center">
            All beds feature luxury Malouf Tencel or Bamboo sheets. Extra pillows and blankets
            are provided.
          </p>
        </div>
      </section>

      {/* ── House Rules ───────────────────────────────────────────── */}
      <section className="py-16 bg-harbor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-3xl font-semibold text-harbor-blue mt-4 mb-6">
                House Rules
              </h2>
              <div className="space-y-4">
                {(
                  [
                    { icon: "self-checkin", label: "Check-in", value: `After ${PROPERTY.checkIn}` },
                    { icon: "door", label: "Check-out", value: `Before ${PROPERTY.checkOut}` },
                    { icon: "guests", label: "Max guests", value: `${PROPERTY.maxGuests} guests` },
                    { icon: "quiet-hours", label: "Quiet hours", value: "10:00 PM – 8:00 AM" },
                    { icon: "no-pets", label: "No pets", value: "Pets not allowed" },
                    { icon: "no-smoking", label: "No smoking", value: "Smoke-free property" },
                    { icon: "no-smoking", label: "No parties", value: "No events beyond guest limit" },
                    { icon: "self-checkin", label: "Self check-in", value: "Keypad entry — no meet & greet needed" },
                  ] satisfies { icon: IconName; label: string; value: string }[]
                ).map((rule) => (
                  <div key={rule.label} className="flex items-center gap-4 py-2 border-b border-gray-100">
                    <Icon name={rule.icon} size={28} className="flex-shrink-0" decorative />
                    <span className="text-sm font-medium text-gray-500 w-28 flex-shrink-0">{rule.label}</span>
                    <span className="text-sm font-semibold text-gray-800">{rule.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-3xl font-semibold text-harbor-blue mt-4 mb-6">
                Guest Access
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                You'll have access to the entire home including the front yard, backyard, garage,
                and all common areas. A few storage spaces on the property are locked and reserved
                for the host.
              </p>

              <div className="bg-harbor-blue rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-3 text-harbor-gold">About Your Host</h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-3">
                  Your host Christopher is a software engineer who loves the lake life. After
                  visiting family in Wisconsin, he made it more permanent. Kelsi co-hosts and
                  helps ensure your stay is perfect.
                </p>
                <div className="flex gap-4 text-xs text-blue-200">
                  <span>✅ Superhost</span>
                  <span>✅ 100% Response Rate</span>
                  <span>✅ Responds within 1 hr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
