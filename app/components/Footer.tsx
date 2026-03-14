import { Link } from "react-router";
import { PROPERTY } from "~/lib/property-data";

const FOOTER_LINKS = {
  Property: [
    { to: "/the-house", label: "The House" },
    { to: "/amenities", label: "Amenities" },
    { to: "/location", label: "Location & Directions" },
    { to: "/reviews", label: "Guest Reviews" },
  ],
  Experiences: [
    { to: "/golf-trips", label: "Golf Trips" },
    { to: "/bachelorette-party", label: "Bachelorette Parties" },
    { to: "/family-vacation", label: "Family Vacations" },
    { to: "/blog", label: "Travel Blog" },
  ],
  Info: [
    { to: "/book", label: "Book Your Stay" },
    { to: "/faq", label: "FAQ" },
    { to: "/sitemap.xml", label: "Sitemap" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-harbor-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <svg className="w-7 h-7 text-harbor-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-9V7h2v4h3l-4 4-4-4h3z" />
              </svg>
              <span className="font-display font-semibold text-xl text-white">
                Harbor on 23rd
              </span>
            </Link>
            <p className="text-blue-100 text-sm leading-relaxed max-w-xs mb-6">
              A spacious 4-bedroom lakeside retreat in Lake Geneva, Wisconsin. Where every stay
              becomes a story.
            </p>
            {/* Rating badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-harbor-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-blue-100">
                4.93 · {PROPERTY.reviewCount} reviews · Airbnb Guest Favorite
              </span>
            </div>
            <a
              href={PROPERTY.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm inline-block"
            >
              Book on Airbnb
            </a>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-harbor-gold mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-blue-100 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-blue-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-blue-300">
            © {new Date().getFullYear()} Harbor on 23rd · Lake Geneva, Wisconsin
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-blue-400">
              Designed for discovery · Built for memories
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
