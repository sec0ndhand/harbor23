import { PROPERTY } from "./property-data";

// seo.ts is imported by route meta functions, which run on both the server
// (SSR) and the client (during navigation). `process` is a Node global and
// is undefined in the browser, so we have to guard the access or the module
// throws at import time during client-side route transitions.
const SITE_URL =
  (typeof process !== "undefined" && process.env?.SITE_URL) ||
  "https://harbor23.com";

export interface SEOMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMeta(meta: SEOMeta) {
  const { title, description, canonical, ogImage, noIndex } = meta;
  const image =
    ogImage ||
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzI0MTcyMzY2NDg2ODc2MDUx/original/0fb0755d-0c7e-4cb5-a990-779494ef9559.jpeg";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: PROPERTY.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    ...(canonical ? [{ tagName: "link", rel: "canonical", href: `${SITE_URL}${canonical}` }] : []),
    ...(noIndex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
  ];
}

export const PAGE_META = {
  home: {
    title: `${PROPERTY.name} | Luxury Lake Geneva Vacation Rental`,
    description: `Spacious 4-bedroom retreat in Lake Geneva, WI. Perfect for golf trips, bachelorette parties & family vacations. Lake access included. Sleeps 14. Book at harbor23.com.`,
    canonical: "/",
  },
  theHouse: {
    title: `The House | ${PROPERTY.name} – Lake Geneva`,
    description: `Explore our 4-bedroom, 3-bathroom lake house near Lake Geneva, WI. Game room, fire pit, full kitchen, lake access. Sleeps up to 14 guests comfortably.`,
    canonical: "/the-house",
  },
  amenities: {
    title: `Amenities | ${PROPERTY.name} – Lake Geneva Vacation Rental`,
    description: `See everything Harbor on 23rd has to offer: full kitchen, game room, fire pit, lake access, bunk beds, queen rooms, luxury sheets, washer/dryer, and more.`,
    canonical: "/amenities",
  },
  location: {
    title: `Location | ${PROPERTY.name} – Lake Geneva, Wisconsin`,
    description: `Harbor on 23rd is 5 minutes from downtown Lake Geneva, 1 hour from Chicago & Milwaukee. Near world-class golf, the lakefront, spa resorts, wineries & more.`,
    canonical: "/location",
  },
  golfTrips: {
    title: `Boys Golf Trip Rental Lake Geneva, WI | ${PROPERTY.name}`,
    description: `The ultimate Lake Geneva golf getaway. Private 4BR home sleeping 14, minutes from Grand Geneva, Geneva National & more. Game room, fire pit & grill included.`,
    canonical: "/golf-trips",
  },
  bachelorette: {
    title: `Bachelorette Party House Lake Geneva | ${PROPERTY.name}`,
    description: `Make your Lake Geneva bachelorette unforgettable. Private 4BR home with game room, fire pit & lake access. 5 minutes from bars, restaurants & boutiques. Sleeps 14.`,
    canonical: "/bachelorette-party",
  },
  family: {
    title: `Family Vacation Rental Lake Geneva WI | ${PROPERTY.name}`,
    description: `Kid-friendly 4BR lake house near Lake Geneva, Wisconsin. Crib, toys, fenced yard, lake access & game room. Create lasting family memories at Harbor on 23rd.`,
    canonical: "/family-vacation",
  },
  book: {
    title: `Book Your Stay | ${PROPERTY.name} – Lake Geneva`,
    description: `Ready to book Harbor on 23rd? Check availability and book directly on Airbnb or send us a message. 4BR retreat in Lake Geneva, WI sleeping up to 14 guests.`,
    canonical: "/book",
  },
  reviews: {
    title: `Guest Reviews | ${PROPERTY.name} – 4.93 Stars`,
    description: `See what guests say about Harbor on 23rd. Rated 4.93/5 with 57+ Airbnb reviews. Lake Geneva, WI vacation rental loved by golf groups, bachelorette parties & families.`,
    canonical: "/reviews",
  },
  faq: {
    title: `FAQ | ${PROPERTY.name} – Lake Geneva Vacation Rental`,
    description: `Common questions about Harbor on 23rd: check-in times, parking, lake access, pet policy, golf courses nearby, cancellation policy & more.`,
    canonical: "/faq",
  },
  blog: {
    title: `Travel Blog | ${PROPERTY.name} – Lake Geneva, WI`,
    description: `Tips, guides & inspiration for your Lake Geneva getaway. Golf courses, bachelorette ideas, family activities, local dining & more from Harbor on 23rd.`,
    canonical: "/blog",
  },
};
