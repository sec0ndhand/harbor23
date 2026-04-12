import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { buildMeta, PAGE_META } from "~/lib/seo";
import { PROPERTY, GOLF_COURSES, ATTRACTIONS, IMAGES } from "~/lib/property-data";
import BookingCTA from "~/components/BookingCTA";
import { Icon, type IconName } from "~/lib/icons";

export const meta: MetaFunction = () => buildMeta(PAGE_META.location);

export default function Location() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-harbor-blue text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="divider-gold" />
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-3">
            Location & Area Guide
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Lake Geneva, Wisconsin — the Midwest's most beloved resort destination, just steps
            from Harbor on 23rd.
          </p>
        </div>
      </div>

      {/* Distance callouts */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(
              [
                { from: "Downtown Lake Geneva", distance: "5 min drive", icon: "house" },
                { from: "Chicago, IL", distance: "~1 hr south", icon: "city-skyline" },
                { from: "Milwaukee, WI", distance: "~1 hr north", icon: "city-skyline" },
                { from: "Lake Geneva Beach", distance: "3 miles", icon: "private-beach" },
              ] satisfies { from: string; distance: string; icon: IconName }[]
            ).map((d) => (
              <div key={d.from} className="text-center p-6 bg-harbor-warm rounded-xl">
                <Icon name={d.icon} size={64} className="mx-auto mb-3" decorative />
                <p className="text-2xl font-bold text-harbor-blue">{d.distance}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{d.from}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Lake Geneva */}
      <section className="py-16 bg-harbor-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="divider-gold" />
          <h2 className="font-display text-3xl font-semibold text-harbor-blue mt-4 mb-6">
            Why Lake Geneva?
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
              For over 150 years, Lake Geneva has been the Midwest's premier resort destination.
              Chicago's wealthy elite have long retreated here — and for good reason. The
              328-acre Geneva Lake, surrounded by Victorian-era estates and modern resorts,
              offers world-class recreation year-round.
            </p>
            <p>
              In summer, it's boating, kayaking, paddleboarding, and beaches. In fall, the
              spectacular foliage draws visitors from across the Midwest. Winter brings alpine
              skiing at Grand Geneva and ice fishing on frozen lakes. Spring offers golf on
              courses that rival anything in the country.
            </p>
            <p>
              The downtown strip is packed with farm-to-table restaurants, wine bars, boutique
              shops, boat tours, and a lively lakefront promenade. It's the kind of town where
              a 2-night trip somehow turns into a week.
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="bg-harbor-blue/10 rounded-xl p-5 border-l-4 border-harbor-gold">
              <p className="font-semibold text-harbor-blue text-sm mb-2 flex items-center gap-2">
                <Icon name="lake-access" size={24} decorative />
                Lake Como Access Included
              </p>
              <p className="text-sm text-gray-600">{PROPERTY.lakeAccessNote}</p>
            </div>
            <div className="bg-harbor-blue/10 rounded-xl p-5 border-l-4 border-harbor-sage">
              <p className="font-semibold text-harbor-blue text-sm mb-2 flex items-center gap-2">
                <Icon name="map-pin" size={24} decorative />
                Neighborhood
              </p>
              <p className="text-sm text-gray-600">
                Quiet residential neighborhood with free street parking. 2 garage spots + 3-4
                driveway spots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Golf Courses */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-3xl font-semibold text-harbor-blue mt-4">
                Nearby Golf Courses
              </h2>
            </div>
            <Link to="/golf-trips" className="text-harbor-blue text-sm font-medium hover:text-harbor-gold transition-colors hidden sm:block">
              Plan Your Golf Trip →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GOLF_COURSES.map((course) => (
              <div key={course.name} className="bg-harbor-cream rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-harbor-blue text-sm">{course.name}</h3>
                  <span className="text-xs bg-harbor-gold/20 text-harbor-gold-dark font-semibold px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                    {course.distance}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions */}
      <section className="py-16 bg-harbor-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="divider-gold" />
          <h2 className="font-display text-3xl font-semibold text-harbor-blue mt-4 mb-8">
            Things to Do Nearby
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ATTRACTIONS.map((a) => (
              <div key={a.name} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-harbor-blue/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-harbor-blue">{a.distance}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{a.name}</p>
                  <p className="text-xs text-harbor-sage font-medium">{a.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directions teaser */}
      <section className="py-12 bg-harbor-blue text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-display text-2xl font-semibold mb-3">Getting Here</h2>
          <p className="text-blue-200 text-sm leading-relaxed mb-6">
            The exact address is provided after booking. The home is in a quiet residential
            neighborhood near Lake Como, just minutes from downtown Lake Geneva.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
            <span className="inline-flex items-center gap-2">
              <Icon name="map-pin" size={22} decorative /> Lake Como neighborhood
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="parking" size={22} decorative /> Easy highway access from I-43 &amp; I-90
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="city-skyline" size={22} decorative /> 60 mi from Chicago O'Hare
            </span>
          </div>
        </div>
      </section>

      <BookingCTA heading="Ready to Explore Lake Geneva?" subtext="Book Harbor on 23rd and make Lake Geneva your home base." />
    </>
  );
}
