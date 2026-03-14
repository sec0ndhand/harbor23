import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { PROPERTY } from "~/lib/property-data";

const NAV_LINKS = [
  { to: "/the-house", label: "The House" },
  { to: "/amenities", label: "Amenities" },
  { to: "/location", label: "Location" },
];

const EXPERIENCES = [
  { to: "/golf-trips", label: "Golf Trips" },
  { to: "/bachelorette-party", label: "Bachelorette Parties" },
  { to: "/family-vacation", label: "Family Vacations" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled
    ? "bg-white shadow-sm border-b border-gray-100"
    : "bg-transparent";

  const linkColor = scrolled ? "text-gray-800 hover:text-harbor-blue" : "text-white hover:text-harbor-gold";
  const logoColor = scrolled ? "text-harbor-blue" : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <svg
              className={`w-7 h-7 transition-colors ${scrolled ? "text-harbor-gold" : "text-harbor-gold"}`}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-9V7h2v4h3l-4 4-4-4h3z" />
            </svg>
            <span
              className={`font-display font-semibold text-lg tracking-wide transition-colors ${logoColor}`}
            >
              Harbor on 23rd
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors border-b-2 pb-0.5 ${
                    isActive
                      ? `border-harbor-gold ${scrolled ? "text-harbor-blue" : "text-white"}`
                      : `border-transparent ${linkColor}`
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Experiences Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setExpOpen(true)}
              onMouseLeave={() => setExpOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors border-b-2 border-transparent pb-0.5 ${linkColor}`}
                aria-haspopup="true"
                aria-expanded={expOpen}
              >
                Experiences
                <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                  {EXPERIENCES.map((exp) => (
                    <NavLink
                      key={exp.to}
                      to={exp.to}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-harbor-warm hover:text-harbor-blue transition-colors"
                    >
                      {exp.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors border-b-2 pb-0.5 ${
                  isActive
                    ? `border-harbor-gold ${scrolled ? "text-harbor-blue" : "text-white"}`
                    : `border-transparent ${linkColor}`
                }`
              }
            >
              Blog
            </NavLink>
          </nav>

          {/* Book Now CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={PROPERTY.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm px-5 py-2.5"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${scrolled ? "text-gray-700" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg mobile-menu-enter">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-harbor-warm text-harbor-blue"
                      : "text-gray-700 hover:bg-gray-50 hover:text-harbor-blue"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="px-3 pt-2 pb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Experiences
              </p>
            </div>
            {EXPERIENCES.map((exp) => (
              <NavLink
                key={exp.to}
                to={exp.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-harbor-warm text-harbor-blue"
                      : "text-gray-600 hover:bg-gray-50 hover:text-harbor-blue"
                  }`
                }
              >
                {exp.label}
              </NavLink>
            ))}
            <NavLink
              to="/blog"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-harbor-warm text-harbor-blue"
                    : "text-gray-700 hover:bg-gray-50 hover:text-harbor-blue"
                }`
              }
            >
              Blog
            </NavLink>
            <div className="pt-3 pb-1">
              <a
                href={PROPERTY.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full text-center text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Book Now on Airbnb
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
