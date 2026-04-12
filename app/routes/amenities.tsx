import type { MetaFunction } from "react-router";
import { buildMeta, PAGE_META } from "~/lib/seo";
import { AMENITIES, AMENITY_CATEGORIES } from "~/lib/property-data";
import AmenityGrid from "~/components/AmenityGrid";
import BookingCTA from "~/components/BookingCTA";
import { Icon, type IconName } from "~/lib/icons";

export const meta: MetaFunction = () => buildMeta(PAGE_META.amenities);

export default function Amenities() {
  return (
    <>
      {/* Header */}
      <div className="bg-harbor-blue text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="divider-gold" />
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-3">
            Amenities
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            {AMENITIES.length}+ amenities across 7 categories. Everything you need — nothing you
            have to pack.
          </p>
        </div>
      </div>

      {/* Quick highlights */}
      <section className="py-12 bg-harbor-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(
              [
                { icon: "lake-access", label: "Lake Como Access", sub: "Sandy beach & boat launch" },
                { icon: "game-room", label: "Game Room", sub: "Entertainment for all ages" },
                { icon: "fire-pit", label: "Fire Pit", sub: "Perfect for evening gatherings" },
                { icon: "gourmet-kitchen", label: "Full Kitchen", sub: "Gas stove, grill & more" },
              ] satisfies { icon: IconName; label: string; sub: string }[]
            ).map((h) => (
              <div key={h.label} className="bg-white rounded-xl p-5 text-center shadow-sm">
                <Icon name={h.icon} size={48} className="mx-auto mb-2" decorative />
                <p className="text-sm font-semibold text-harbor-blue">{h.label}</p>
                <p className="text-xs text-gray-400 mt-1">{h.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full amenity list with filter */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-harbor-blue mb-8">
            All Amenities
          </h2>
          <AmenityGrid showFilter />
        </div>
      </section>

      {/* By category */}
      {AMENITY_CATEGORIES.map((cat) => {
        const items = AMENITIES.filter((a) => a.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat} className="py-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="font-display text-xl font-semibold text-harbor-blue mb-5">
                {cat}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <span className="text-xl">{a.icon}</span>
                    <span className="text-sm text-gray-700">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <BookingCTA />
    </>
  );
}
