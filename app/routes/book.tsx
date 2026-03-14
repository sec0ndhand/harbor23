import { data, Form } from "react-router";
import type { MetaFunction, ActionFunctionArgs } from "react-router";
import { User } from "lucide-react";
import { buildMeta, PAGE_META } from "~/lib/seo";
import { PROPERTY, IMAGES } from "~/lib/property-data";
import { createInquiry } from "~/lib/pocketbase.server";
import type { Inquiry } from "~/lib/types";

export const meta: MetaFunction = () => buildMeta(PAGE_META.book);

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const inquiry: Inquiry = {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || "") || undefined,
    message: String(formData.get("message") || ""),
    check_in: String(formData.get("check_in") || "") || undefined,
    check_out: String(formData.get("check_out") || "") || undefined,
    guests: formData.get("guests") ? Number(formData.get("guests")) : undefined,
    event_type: (formData.get("event_type") as Inquiry["event_type"]) || undefined,
  };

  // Basic validation
  if (!inquiry.name || !inquiry.email || !inquiry.message) {
    return data({ success: false, error: "Please fill in your name, email, and message." }, { status: 400 });
  }

  const result = await createInquiry(inquiry);
  return data(result);
}

export default function Book() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[45vh] min-h-[380px] flex items-end pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src={`${IMAGES.exterior2.url}?im_w=1400`}
            alt="Book Harbor on 23rd — Lake Geneva vacation rental"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="hero-gradient absolute inset-0" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-3">
            Book Your Stay
          </h1>
          <p className="text-blue-100 text-lg max-w-xl">
            Ready to secure your dates? Check availability on Airbnb or send us a message below.
          </p>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <section className="py-20 bg-harbor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Airbnb CTA + property summary */}
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-3xl font-semibold text-harbor-blue mt-4 mb-6">
                Check Availability
              </h2>

              {/* Airbnb Button */}
              <a
                href={PROPERTY.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full text-center text-base py-4 mb-8 flex items-center justify-center gap-3"
              >
                <User className="w-5 h-5" />
                View Calendar &amp; Book on Airbnb
              </a>

              {/* Property quick facts */}
              <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
                <h3 className="font-display text-xl font-semibold text-harbor-blue mb-6">
                  Quick Facts
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "🛏️", label: "Bedrooms", value: "4" },
                    { icon: "👥", label: "Max Guests", value: "14" },
                    { icon: "🛁", label: "Bathrooms", value: "3" },
                    { icon: "⭐", label: "Rating", value: `${PROPERTY.rating}/5` },
                    { icon: "🔑", label: "Check-in", value: PROPERTY.checkIn },
                    { icon: "🚪", label: "Check-out", value: PROPERTY.checkOut },
                    { icon: "🐾", label: "Pets", value: "Not allowed" },
                    { icon: "🚗", label: "Parking", value: "Free (5–6 cars)" },
                  ].map((fact) => (
                    <div key={fact.label} className="flex items-center gap-3">
                      <span className="text-xl w-8 text-center">{fact.icon}</span>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">{fact.label}</p>
                        <p className="text-sm font-semibold text-harbor-blue">{fact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location summary */}
              <div className="bg-harbor-blue rounded-2xl p-8 text-white">
                <h3 className="font-display text-xl font-semibold text-harbor-gold mb-4">
                  Location
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    { icon: "📍", text: "Lake Geneva, Wisconsin" },
                    { icon: "🏙️", text: "5 minutes to downtown Lake Geneva" },
                    { icon: "🚗", text: "~1 hour from Chicago & Milwaukee" },
                    { icon: "🌊", text: "Lake Como access included" },
                    { icon: "⛳", text: "World-class golf within minutes" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-3 text-blue-100">
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Inquiry Form */}
            <div>
              <span className="divider-gold" />
              <h2 className="font-display text-3xl font-semibold text-harbor-blue mt-4 mb-2">
                Send an Inquiry
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Have questions or want to discuss dates? Fill out the form below and we'll
                get back to you within 24 hours.
              </p>

              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InquiryForm() {
  return (
    <Form method="post" className="space-y-5" id="inquiry-form">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-harbor-blue mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-harbor-gold focus:border-transparent text-sm bg-white"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-harbor-blue mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-harbor-gold focus:border-transparent text-sm bg-white"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-harbor-blue mb-1.5">
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-harbor-gold focus:border-transparent text-sm bg-white"
          />
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-harbor-blue mb-1.5">
            Number of Guests
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min="1"
            max="14"
            placeholder="e.g. 8"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-harbor-gold focus:border-transparent text-sm bg-white"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="check_in" className="block text-sm font-medium text-harbor-blue mb-1.5">
            Desired Check-in
          </label>
          <input
            id="check_in"
            name="check_in"
            type="date"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-harbor-gold focus:border-transparent text-sm bg-white"
          />
        </div>
        <div>
          <label htmlFor="check_out" className="block text-sm font-medium text-harbor-blue mb-1.5">
            Desired Check-out
          </label>
          <input
            id="check_out"
            name="check_out"
            type="date"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-harbor-gold focus:border-transparent text-sm bg-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="event_type" className="block text-sm font-medium text-harbor-blue mb-1.5">
          Trip Type
        </label>
        <select
          id="event_type"
          name="event_type"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-harbor-gold focus:border-transparent text-sm bg-white text-gray-700"
        >
          <option value="">Select a trip type…</option>
          <option value="family">Family Vacation</option>
          <option value="golf">Golf Trip</option>
          <option value="bachelorette">Bachelorette Party</option>
          <option value="other">Other Group Trip</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-harbor-blue mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your trip, any questions you have, or special requests…"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-harbor-gold focus:border-transparent text-sm bg-white resize-none"
        />
      </div>

      <button
        type="submit"
        className="btn-gold w-full py-4 text-base"
      >
        Send Inquiry
      </button>

      <p className="text-xs text-gray-400 text-center">
        We respond within 24 hours. For immediate booking, use the{" "}
        <a
          href={PROPERTY.airbnbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-harbor-gold hover:underline"
        >
          Airbnb listing
        </a>
        .
      </p>
    </Form>
  );
}
