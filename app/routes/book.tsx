import { useState } from "react";
import type { MetaFunction } from "react-router";
import { User } from "lucide-react";
import { buildMeta, PAGE_META } from "~/lib/seo";
import { PROPERTY, IMAGES } from "~/lib/property-data";
import { Icon, type IconName } from "~/lib/icons";

export const meta: MetaFunction = () => buildMeta(PAGE_META.book);

// Netlify Forms: submissions are handled entirely by Netlify's edge, not by a
// React Router action. The form schema is declared once in public/__forms.html
// so Netlify's post-processing can detect it during build; runtime submissions
// are posted client-side via fetch, which keeps the SSR HTML clean and lets us
// show inline success/error states without a page reload.

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
                  {(
                    [
                      { icon: "bedroom", label: "Bedrooms", value: "4" },
                      { icon: "guests", label: "Max Guests", value: "14" },
                      { icon: "bathroom", label: "Bathrooms", value: "3" },
                      { icon: "sparkle", label: "Rating", value: `${PROPERTY.rating}/5` },
                      { icon: "self-checkin", label: "Check-in", value: PROPERTY.checkIn },
                      { icon: "door", label: "Check-out", value: PROPERTY.checkOut },
                      { icon: "no-pets", label: "Pets", value: "Not allowed" },
                      { icon: "parking", label: "Parking", value: "Free (5–6 cars)" },
                    ] satisfies { icon: IconName; label: string; value: string }[]
                  ).map((fact) => (
                    <div key={fact.label} className="flex items-center gap-3">
                      <Icon name={fact.icon} size={32} className="flex-shrink-0" decorative />
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
                  {(
                    [
                      { icon: "map-pin", text: "Lake Geneva, Wisconsin" },
                      { icon: "city-skyline", text: "5 minutes to downtown Lake Geneva" },
                      { icon: "parking", text: "~1 hour from Chicago & Milwaukee" },
                      { icon: "lake-access", text: "Lake Como access included" },
                      { icon: "golf", text: "World-class golf within minutes" },
                    ] satisfies { icon: IconName; text: string }[]
                  ).map((item) => (
                    <li key={item.text} className="flex items-center gap-3 text-blue-100">
                      <Icon name={item.icon} size={22} decorative />
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

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

function InquiryForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Client-side validation matches required attrs.
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    // Build the URL-encoded body Netlify Forms expects.
    const body: Record<string, string> = { "form-name": "inquiry" };
    formData.forEach((value, key) => {
      body[key] = String(value);
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(body),
      });
      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-harbor-gold/30">
        <h3 className="font-display text-2xl font-semibold text-harbor-blue mb-2">
          Message sent — thank you!
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          We'll respond within 24 hours. In the meantime, you can also view the
          calendar and book directly on{" "}
          <a
            href={PROPERTY.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-harbor-gold hover:underline font-medium"
          >
            Airbnb
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      name="inquiry"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-5"
      id="inquiry-form"
      noValidate
    >
      {/* Netlify Forms requires this hidden field so the edge can route the
          submission to the matching form declared in public/__forms.html. */}
      <input type="hidden" name="form-name" value="inquiry" />
      {/* Honeypot: bots fill hidden fields; real users don't. */}
      <p className="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </p>

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

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gold w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send Inquiry"}
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
    </form>
  );
}
