import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

export default function StarRating({
  rating,
  max = 5,
  size = "md",
  showNumber = false,
}: StarRatingProps) {
  const sizeMap = { sm: "w-3.5 h-3.5", md: "w-5 h-5", lg: "w-6 h-6" };
  const starSize = sizeMap[size];

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;

        return (
          <div key={i} className="relative">
            {/* Empty star */}
            <Star className={`${starSize} text-gray-200`} fill="currentColor" />
            {/* Filled or partial star */}
            {(filled || partial) && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: partial ? `${(rating % 1) * 100}%` : "100%" }}
              >
                <Star className={`${starSize} text-harbor-gold`} fill="currentColor" />
              </div>
            )}
          </div>
        );
      })}
      {showNumber && (
        <span className="ml-1 text-sm font-semibold text-gray-700">{rating.toFixed(2)}</span>
      )}
    </div>
  );
}
