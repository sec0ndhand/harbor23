import { Link } from "react-router";
import { Anchor, Star } from "lucide-react";
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
              <Anchor className="w-7 h-7 text-harbor-gold" />
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
                  <Star key={i} className="w-4 h-4 text-harbor-gold" fill="currentColor" />
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
