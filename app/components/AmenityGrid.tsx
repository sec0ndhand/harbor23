import { useState } from "react";
import { AMENITIES, AMENITY_CATEGORIES } from "~/lib/property-data";
import { Icon } from "~/lib/icons";

interface AmenityGridProps {
  filterCategory?: string;
  showFilter?: boolean;
  limit?: number;
}

export default function AmenityGrid({ filterCategory, showFilter = false, limit }: AmenityGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(filterCategory || "All");

  const filtered = AMENITIES.filter((a) =>
    activeCategory === "All" ? true : a.category === activeCategory
  ).slice(0, limit);

  return (
    <div>
      {showFilter && (
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", ...AMENITY_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-harbor-blue text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-harbor-blue hover:text-harbor-blue"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((amenity, i) => (
          <div key={i} className="amenity-item">
            <Icon
              name={amenity.icon}
              size={32}
              className="flex-shrink-0"
              decorative
            />
            <div>
              <span className="text-sm font-medium text-gray-800">{amenity.label}</span>
              <span className="block text-xs text-gray-400">{amenity.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
