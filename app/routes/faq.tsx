import type { MetaFunction } from "react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { buildMeta, PAGE_META } from "~/lib/seo";
import { FAQ_ITEMS, PROPERTY } from "~/lib/property-data";
import BookingCTA from "~/components/BookingCTA";

export const meta: MetaFunction = () => [
  ...buildMeta(PAGE_META.faq),
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="font-semibold text-harbor-blue text-base group-hover:text-harbor-gold transition-colors leading-snug">
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full bg-harbor-blue text-white flex items-center justify-center transition-transform mt-0.5 ${open ? "rotate-180" : ""}`}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </span>
      </button>
      {open && (
        <div className="pb-6 text-gray-600 text-sm leading-relaxed -mt-2">
          {answer}
        </div>
      )}
    </div>
  );
}

const FAQ_CATEGORIES = [
  {
    title: "Check-in & Logistics",
    ids: [0, 1, 5],
  },
  {
    title: "The Property",
    ids: [2, 3, 6, 9],
  },
  {
    title: "Location & Activities",
    ids: [4, 8],
  },
  {
    title: "House Rules & Policies",
    ids: [7, 10, 11],
  },
];

export default function FAQ() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="bg-harbor-blue text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-harbor-gold text-harbor-blue text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              FAQ
            </span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed">
              Everything you need to know about staying at Harbor on 23rd. Can't find your
              answer? Send us a message.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ Content ──────────────────────────────────────────── */}
      <section className="py-20 bg-harbor-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Category nav (sticky on desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-2">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-semibold">
                  Topics
                </p>
                {FAQ_CATEGORIES.map((cat) => (
                  <a
                    key={cat.title}
                    href={`#${cat.title.toLowerCase().replace(/\s+&?\s*/g, "-")}`}
                    className="block text-sm text-gray-600 hover:text-harbor-blue hover:font-semibold py-1.5 border-l-2 border-transparent hover:border-harbor-gold pl-3 transition-all"
                  >
                    {cat.title}
                  </a>
                ))}
              </div>
            </aside>

            {/* FAQ accordion sections */}
            <div className="lg:col-span-2 space-y-12">
              {FAQ_CATEGORIES.map((cat) => (
                <div
                  key={cat.title}
                  id={cat.title.toLowerCase().replace(/\s+&?\s*/g, "-")}
                >
                  <h2 className="font-display text-2xl font-semibold text-harbor-blue mb-2">
                    {cat.title}
                  </h2>
                  <div className="bg-white rounded-2xl px-6 shadow-sm">
                    {cat.ids.map((idx) => {
                      const item = FAQ_ITEMS[idx];
                      return item ? (
                        <FAQItem key={idx} question={item.question} answer={item.answer} />
                      ) : null;
                    })}
                  </div>
                </div>
              ))}

              {/* Still have questions */}
              <div className="bg-harbor-blue rounded-2xl p-8 text-white">
                <h3 className="font-display text-2xl font-semibold mb-3">Still Have Questions?</h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-6">
                  We're happy to answer anything. Send us a message and we'll get back to you
                  within 24 hours.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/book"
                    className="btn-gold text-sm px-6 py-3"
                  >
                    Send a Message
                  </a>
                  <a
                    href={PROPERTY.airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-white text-sm px-6 py-3"
                  >
                    View on Airbnb
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
