import StarRating from "./StarRating";
import type { Review } from "~/lib/types";

interface ReviewCardProps {
  review: Review;
  variant?: "default" | "featured";
}

export default function ReviewCard({ review, variant = "default" }: ReviewCardProps) {
  if (variant === "featured") {
    return (
      <div className="review-card h-full flex flex-col">
        <StarRating rating={review.rating} size="sm" />
        <p className="mt-3 text-gray-700 leading-relaxed text-sm flex-1 italic">
          &ldquo;{review.content}&rdquo;
        </p>
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-harbor-blue flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-semibold">
              {review.author.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{review.author}</p>
            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              {review.platform === "airbnb" && (
                <>
                  <span className="inline-block w-3 h-3 bg-[#FF385C] rounded-full" />
                  Airbnb ·{" "}
                </>
              )}
              {review.date}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-harbor-blue flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold">
              {review.author.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{review.author}</p>
            <p className="text-sm text-gray-400 flex items-center gap-1.5">
              {review.platform === "airbnb" && (
                <>
                  <span className="inline-block w-2.5 h-2.5 bg-[#FF385C] rounded-full" />
                  Airbnb ·{" "}
                </>
              )}
              {review.date}
            </p>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>
      <p className="text-gray-600 leading-relaxed text-sm">{review.content}</p>
    </div>
  );
}
