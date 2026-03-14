import { PROPERTY } from "~/lib/property-data";

interface BookingCTAProps {
  heading?: string;
  subtext?: string;
  variant?: "dark" | "light" | "gold";
  className?: string;
}

export default function BookingCTA({
  heading = "Ready to Book Your Stay?",
  subtext = `Check availability and book directly on Airbnb. Sleeps up to ${PROPERTY.maxGuests} guests.`,
  variant = "dark",
  className = "",
}: BookingCTAProps) {
  const bg =
    variant === "dark"
      ? "bg-harbor-blue text-white"
      : variant === "gold"
      ? "bg-harbor-gold text-harbor-blue"
      : "bg-harbor-warm text-harbor-blue";

  return (
    <section className={`py-20 ${bg} ${className}`}>
      <div className="max-w-3xl mx-auto text-center px-4">
        <span className="divider-gold-center" />
        <h2 className="font-display text-3xl md:text-4xl font-semibold mt-4 mb-4">{heading}</h2>
        <p
          className={`text-lg mb-8 max-w-xl mx-auto leading-relaxed ${
            variant === "dark" ? "text-blue-100" : "opacity-80"
          }`}
        >
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={PROPERTY.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-gold text-base px-8 py-3.5 ${variant === "gold" ? "bg-harbor-blue text-white hover:bg-harbor-blue-light" : ""}`}
          >
            Check Availability on Airbnb
          </a>
          <a href="/book" className="btn-outline-white text-base px-8 py-3.5">
            Send Us a Message
          </a>
        </div>
        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm opacity-80">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {PROPERTY.rating}★ on Airbnb
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {PROPERTY.reviewCount}+ Guest Reviews
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Airbnb Superhost
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Sleeps up to {PROPERTY.maxGuests}
          </span>
        </div>
      </div>
    </section>
  );
}
