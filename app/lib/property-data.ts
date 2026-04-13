import type { GalleryImage, Review, Amenity } from "./types";

export const PROPERTY = {
  name: "Blue Juniper",
  internalName: "Harbor on 23rd, Blue Juniper",
  tagline: "Cozy Lakeside Retreat Near Downtown Lake Geneva",
  airbnbUrl: "https://www.airbnb.com/rooms/724172366486876051",
  siteUrl: "https://harbor23.com",

  // Stats
  bedrooms: 4,
  bathrooms: 3,
  maxGuests: 14,
  beds: 12,
  rating: 4.93,
  reviewCount: 57,

  // Location
  city: "Lake Geneva",
  state: "Wisconsin",
  addressRegion: "WI",
  country: "US",
  lat: 42.61492,
  lng: -88.47068,
  distanceToDowntown: "5 minutes",
  distanceToChicago: "~1 hour",
  distanceToMilwaukee: "~1 hour",
  distanceToLakeGenevaBach: "3 miles",

  // Check-in/out
  checkIn: "4:00 PM",
  checkOut: "10:00 AM",

  // Description
  shortDescription:
    "A spacious 4-bedroom lakeside retreat just five minutes from downtown Lake Geneva. Game room, fire pit, lake access, and everything your group needs for an unforgettable stay.",
  fullDescription: `Looking for the perfect vacation home to accommodate your family or a large group of friends? Blue Juniper is the ideal retreat, offering all the space and amenities you need to make unforgettable memories together.

Our four-bedroom home is just five minutes from downtown Lake Geneva, but it's still secluded enough to provide a peaceful and relaxing atmosphere. With plenty of room to spread out, you and your guests can enjoy your own private space or come together in the spacious living areas for quality time.

At Blue Juniper, we believe that comfort is key, which is why we've outfitted our home with plush, comfortable beds featuring luxurious Malouf Tencel or Bamboo Sheets. With four sets of bunk beds and three queen beds, plus a cozy basement couch that sleeps two, there's plenty of sleeping space for everyone.

No gathering is complete without food, and our large kitchen table with ample seating ensures there's always room for everyone at mealtime. Whether you prefer to cook inside or take the party outdoors and fire up the grill, we've got you covered.

When it's time to relax and unwind, our living areas are perfect for gathering together to enjoy games, puzzles, toys, and books for all ages. And when the sun goes down, there's no better place to be than around our fire pit, enjoying treats and conversation under the stars.

Blue Juniper is more than just a vacation rental — it's a place where you can create lasting memories with the people you love.`,

  lakeAccessNote:
    "Access to Lake Como is provided and available during the summer months. The lake association amenities include lakefront parks, a sandy beach, and a boat launch.",
};

// ── Images — locally optimized from the Airbnb listing ──────────────────────
// Photos are synced by scripts/sync-airbnb-photos.ts into public/images/listing/.
// Each entry has a JPEG fallback + WebP srcSet for responsive loading.
import { LISTING_PHOTOS } from "./listing-photos";

/** Look up a listing photo by its original Airbnb CDN filename (UUID.jpeg). */
function byFile(filename: string, alt: string, caption?: string): GalleryImage {
  const photo = LISTING_PHOTOS.find((p) => p.originalFilename === filename);
  if (photo) {
    return {
      url: photo.src,
      alt,
      caption,
      srcSet: photo.srcSet,
      width: photo.width,
      height: photo.height,
    };
  }
  // Fallback: serve from Airbnb CDN if local photo doesn't exist yet.
  const BASE =
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzI0MTcyMzY2NDg2ODc2MDUx/original/";
  return { url: `${BASE}${filename}`, alt, caption };
}

export const IMAGES = {
  hero: byFile("0fb0755d-0c7e-4cb5-a990-779494ef9559.jpeg", "Harbor on 23rd — a cozy 4-bedroom Lake Geneva Wisconsin vacation rental, exterior view"),
  bedroom1: byFile("063c8df6-b539-4a50-ada5-9ad9896c6f54.jpeg", "Kid-friendly bunk bedroom sleeping four at Harbor on 23rd"),
  bedroom2: byFile("f51ddd26-8b58-405c-9e12-c1422fe7b864.jpeg", "Queen bedroom with luxury bamboo sheets"),
  bedroom3: byFile("4b3c9eb4-2211-42a4-897d-088121b3568c.jpeg", "Cozy queen guest bedroom with soft lighting"),
  bedroom4: byFile("1ab5b076-b11d-4f51-98f7-bc68ee7028a0.jpeg", "Primary bedroom with a queen bed and bunk beds for families"),
  living1: byFile("c5e54af7-a0f6-4ee3-87f3-935d8c178d33.jpeg", "Spacious open-plan living room with sectional seating for groups of 14"),
  living2: byFile("fb0bad41-d537-4aa6-bc3c-52ec5917bd90.jpeg", "Living area with a gas fireplace and large windows"),
  kitchen: byFile("3f21f60d-8c4c-4456-a241-11b26a56dcdf.jpeg", "Full gourmet kitchen with gas stove, island and bar stools"),
  dining: byFile("4f68c757-ca48-4528-88a1-6aaee44811e5.jpeg", "Large dining table seating the whole group for family dinners"),
  gameRoom: byFile("54ee0570-3922-4853-8a6c-b2d4088f3e66.jpeg", "Basement game room with pool table — a rainy-day favorite"),
  backyard: byFile("65cc9bdc-1308-4d01-a0df-1b09ddaab09f.jpeg", "Fully fenced backyard with space for kids and pets"),
  firePit: byFile("c3c3768f-3ce2-41fa-935b-0386eea9c425.jpeg", "Stone fire pit in the backyard for evening gatherings and s'mores"),
  patio: byFile("ab9428af-b4c7-48e6-b793-2b93ebebb492.jpeg", "Back patio with outdoor seating for lake-days and sunsets"),
  bathroom1: byFile("c60f05d4-cce4-40a5-a06f-a098af239499.jpeg", "Full bathroom with a walk-in shower and modern fixtures"),
  exterior2: byFile("654ff099-1a67-4ec1-986d-e20e0e7e4447.jpeg", "Harbor on 23rd exterior with landscaped front yard"),
  exterior3: byFile("34528ab5-b67e-4ada-a56d-6ebe2591b886.jpeg", "Front of the Harbor on 23rd house, tree-lined street view"),
};

// The full gallery is every photo from the Airbnb listing, served locally.
export const GALLERY: GalleryImage[] = LISTING_PHOTOS.map((p) => ({
  url: p.src,
  alt: p.alt,
  srcSet: p.srcSet,
  width: p.width,
  height: p.height,
}));

// ── Bedrooms ────────────────────────────────────────────────────────────────
export const BEDROOMS = [
  {
    name: "Bedroom 1",
    description: "2 bunk beds (sleeps 4)",
    image: IMAGES.bedroom1,
  },
  {
    name: "Bedroom 2",
    description: "1 queen bed",
    image: IMAGES.bedroom2,
  },
  {
    name: "Bedroom 3",
    description: "1 queen bed",
    image: IMAGES.bedroom3,
  },
  {
    name: "Bedroom 4",
    description: "1 queen bed + 2 bunk beds (sleeps 6)",
    image: IMAGES.bedroom4,
  },
  {
    name: "Basement",
    description: "Couch (sleeps 2)",
    image: IMAGES.living2,
  },
];

// ── Amenities ───────────────────────────────────────────────────────────────
// `icon` is an IconName key resolved by app/lib/icons.tsx at render time.
export const AMENITIES: Amenity[] = [
  // Outdoors & Lake
  { icon: "lake-access", label: "Lake access (Lake Como)", category: "Outdoors" },
  { icon: "private-beach", label: "Private beach access", category: "Outdoors" },
  { icon: "fire-pit", label: "Fire pit", category: "Outdoors" },
  { icon: "fenced-backyard", label: "Fully fenced backyard", category: "Outdoors" },
  { icon: "patio", label: "Outdoor furniture & patio", category: "Outdoors" },
  { icon: "grill", label: "BBQ grill (charcoal)", category: "Outdoors" },
  // Entertainment
  { icon: "game-room", label: "Game room", category: "Entertainment" },
  { icon: "hdtv", label: "HDTV with Netflix, Hulu, Disney+", category: "Entertainment" },
  { icon: "board-games", label: "Board games & puzzles", category: "Entertainment" },
  { icon: "books-toys", label: "Books, toys for all ages", category: "Entertainment" },
  // Kitchen
  { icon: "gourmet-kitchen", label: "Full gourmet kitchen", category: "Kitchen" },
  { icon: "gas-stove", label: "Whirlpool gas stove & oven", category: "Kitchen" },
  { icon: "refrigerator", label: "Full-size refrigerator + mini fridge", category: "Kitchen" },
  { icon: "dishwasher", label: "Dishwasher", category: "Kitchen" },
  { icon: "coffee", label: "Keurig coffee maker", category: "Kitchen" },
  { icon: "wine-glasses", label: "Wine glasses & blender", category: "Kitchen" },
  // Comfort
  { icon: "bedroom", label: "Luxury Malouf bamboo/Tencel sheets", category: "Comfort" },
  { icon: "fireplace", label: "Gas indoor fireplace", category: "Comfort" },
  { icon: "air-conditioning", label: "Central A/C & heat", category: "Comfort" },
  { icon: "blackout-shades", label: "Room-darkening shades", category: "Comfort" },
  { icon: "washer-dryer", label: "Washer & dryer in-unit", category: "Comfort" },
  { icon: "hair-dryer", label: "Hair dryer & iron", category: "Comfort" },
  // Family
  { icon: "crib", label: "Crib & Pack 'n play available", category: "Family" },
  { icon: "toys", label: "Children's toys & books", category: "Family" },
  { icon: "kids-dinnerware", label: "Children's dinnerware", category: "Family" },
  // Parking & Access
  { icon: "parking", label: "Free parking (2 garage + 3-4 driveway)", category: "Parking" },
  { icon: "self-checkin", label: "Self check-in / keypad entry", category: "Parking" },
  { icon: "wifi", label: "High-speed WiFi", category: "Parking" },
  // Safety
  { icon: "fire-safety", label: "Fire extinguisher & first aid kit", category: "Safety" },
  { icon: "smoke-detector", label: "Smoke & CO detectors", category: "Safety" },
];

export const AMENITY_CATEGORIES = [
  "Outdoors",
  "Entertainment",
  "Kitchen",
  "Comfort",
  "Family",
  "Parking",
  "Safety",
];

// ── Static reviews (from Airbnb) ────────────────────────────────────────────
export const STATIC_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Sarah M.",
    rating: 5,
    date: "October 2024",
    content:
      "Absolutely perfect for our girls' bachelorette weekend! The game room was a huge hit, and the fire pit made for the coziest late-night conversations. The house was spotlessly clean and had everything we needed. Location is ideal — 5 minutes to all the great restaurants and shops downtown. We'll definitely be back!",
    platform: "airbnb",
  },
  {
    id: "2",
    author: "Mike T.",
    rating: 5,
    date: "August 2024",
    content:
      "Our annual golf trip found its permanent home. The house comfortably fit our group of 12, and the bunk rooms were surprisingly comfortable. Love that we could fire up the grill after a long day on the course. Close to Grand Geneva and Geneva National — perfect location for a golf getaway.",
    platform: "airbnb",
  },
  {
    id: "3",
    author: "The Johnson Family",
    rating: 5,
    date: "July 2024",
    content:
      "Best family vacation we've had in years! The kids loved the bunk beds and the board games. We used the lake access every day — the beach association was clean and never too crowded. The kitchen was large enough for all of us to cook together, which made it feel like a real home away from home. Christopher was incredibly responsive.",
    platform: "airbnb",
  },
  {
    id: "4",
    author: "Amanda K.",
    rating: 5,
    date: "June 2024",
    content:
      "We had the most magical bachelorette party here! The house is gorgeous, spacious, and stocked with everything you need. The fire pit was perfect for our last night there. Lake Geneva downtown is so fun — wine bars, restaurants, shops — all just minutes away. Highly recommend for any group trip!",
    platform: "airbnb",
  },
  {
    id: "5",
    author: "David R.",
    rating: 5,
    date: "September 2024",
    content:
      "Couldn't have asked for a better setup for our golf group. The house was clean, spacious, and the host was amazing. Everyone had their own space at night but we all came together in the evenings around the fire pit. Already planning to come back next year!",
    platform: "airbnb",
  },
  {
    id: "6",
    author: "Lisa & Family",
    rating: 5,
    date: "August 2024",
    content:
      "A true gem near Lake Geneva. The kids had a blast and the adults got to actually relax. The backyard is fully fenced so the little ones could play safely. We used the crib they provided and it was perfect. The lake access was the highlight of our trip. Five stars without hesitation.",
    platform: "airbnb",
  },
];

// ── Nearby Golf Courses ──────────────────────────────────────────────────────
export const GOLF_COURSES = [
  {
    name: "Grand Geneva Resort – The Brute",
    distance: "~5 min",
    description:
      "Championship 18-hole course — long, muscular, and consistently ranked among the best in Wisconsin. The layout rewards every handicap level.",
    url: "https://www.grandgeneva.com/golf/courses",
    reviewHighlight:
      "One of the top-rated courses in the Midwest — greens and conditioning are resort-excellent. Always in great shape.",
  },
  {
    name: "Grand Geneva Resort – The Highlands",
    distance: "~5 min",
    description:
      "Scottish links-style sibling to The Brute, with rolling terrain and fescue roughs. Play both Grand Geneva courses back-to-back for the full experience.",
    url: "https://www.grandgeneva.com/golf/courses",
    reviewHighlight:
      "A great contrast to The Brute — the elevation changes and wind make it a completely different challenge on the same property.",
  },
  {
    name: "Geneva National Golf Club",
    distance: "~10 min",
    description:
      "54 holes designed by Arnold Palmer, Gary Player, and Lee Trevino. The Palmer course is the standout — signature lakefront holes and an excellent clubhouse steakhouse.",
    url: "https://www.destinationgn.com/golf",
    reviewHighlight:
      "The Palmer course is a bucket-list Midwest round. Lakefront holes are stunning. The Hunt Club Steakhouse is surprisingly excellent — don't skip it.",
  },
  {
    name: "Abbey Springs Golf Course",
    distance: "~10 min",
    description:
      "Semi-private gem in Fontana with postcard water views on multiple holes. Tight, tree-lined fairways that reward accuracy over power.",
    url: "https://www.abbeysprings.org/",
    reviewHighlight:
      "A hidden gem — beautiful views and well-maintained without the big resort price tag. A favorite second-day course for golf groups.",
  },
  {
    name: "Hawk's View Golf Club",
    distance: "~15 min",
    description:
      "Dramatic elevation changes you don't expect in Wisconsin. The championship Como Crossings layout is the main 18; Barn Hollow is a great par-3 warm-up.",
    url: "https://www.hawksviewgolfclub.com/",
    reviewHighlight:
      "The elevation changes feel like a completely different state — memorable holes and great pace of play.",
  },
];

// ── Nearby Attractions ───────────────────────────────────────────────────────
export const ATTRACTIONS = [
  { name: "Lake Geneva Cruise Line", type: "Water", distance: "5 min" },
  { name: "Downtown Lake Geneva Shopping & Dining", type: "Shopping/Dining", distance: "5 min" },
  { name: "Lake Geneva Winery", type: "Wine/Spirits", distance: "8 min" },
  { name: "The Abbey Resort & Avani Spa", type: "Spa/Resort", distance: "10 min" },
  { name: "Yerkes Observatory", type: "Historic/Science", distance: "15 min" },
  { name: "Geneva Lake Shore Path (public walk)", type: "Outdoor", distance: "5 min" },
  { name: "Hillmoor Golf Park (mini golf, batting cages)", type: "Family Fun", distance: "5 min" },
  { name: "Tristan's Pub & Restaurant", type: "Dining", distance: "5 min" },
  { name: "Grand Geneva Ski Hill (winter)", type: "Winter Sports", distance: "8 min" },
  { name: "Alpine Valley Music Theatre", type: "Entertainment", distance: "20 min" },
];

// ── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    question: "What time is check-in and check-out?",
    answer:
      "Check-in is at 4:00 PM and check-out is at 10:00 AM. The home has self check-in via keypad entry, so there's no need to coordinate key exchanges.",
  },
  {
    question: "How many people can the property accommodate?",
    answer:
      "The property sleeps up to 14 guests across 4 bedrooms and a basement couch. The 12 beds include queen beds, bunk beds, and the couch-sleeper. It's an ideal setup for large families or group trips.",
  },
  {
    question: "Is lake access included?",
    answer:
      "Yes! Access to Lake Como is included during the summer months and is available through the lake association. Amenities include lakefront parks, a sandy beach, and a boat launch. Please inquire after booking if you plan to use the lake access.",
  },
  {
    question: "How far is the property from downtown Lake Geneva?",
    answer:
      "The house is just about 5 minutes from downtown Lake Geneva, where you'll find restaurants, bars, boutique shops, the lakefront promenade, and boat tours.",
  },
  {
    question: "How long is the drive from Chicago to Lake Geneva?",
    answer:
      "Harbor on 23rd is about 90 minutes from downtown Chicago — roughly 75 miles up I-94. From Chicago's north-side neighborhoods (Lincoln Park, Lakeview, Wicker Park) and north-shore suburbs (Evanston, Northbrook, Highland Park) it's closer to 60–80 minutes. No flights, no rental cars, just get in the car and go. Milwaukee is about an hour north of the property.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes! There are 2 spots in the attached garage plus 3–4 additional spots on the driveway. Street parking is also available. Large groups can easily accommodate multiple vehicles.",
  },
  {
    question: "Are pets allowed?",
    answer: "We're sorry — pets are not permitted at this property.",
  },
  {
    question: "Is it suitable for a bachelorette party?",
    answer:
      "Absolutely! Many of our guests choose Harbor on 23rd for bachelorette parties. The game room, fire pit, large dining table, and proximity to downtown Lake Geneva's restaurants, wine bars, and activities make it perfect. No events or large gatherings beyond the guest limit (14) are permitted.",
  },
  {
    question: "What golf courses are nearby?",
    answer:
      "There are five world-class courses within 12 miles: Grand Geneva Resort's The Brute and The Highlands, Geneva National (three 18-hole courses), Abbey Springs, and Hawk's View Golf Club. We recommend booking tee times in advance, especially in summer.",
  },
  {
    question: "Are children welcome?",
    answer:
      "Yes! The home is very family friendly. We provide a crib, Pack 'n play, children's books and toys for ages 0–10+, and children's dinnerware. The backyard is fully fenced, providing a safe outdoor play space.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellation policies are set through Airbnb. Please review the listing on Airbnb when booking for the most current cancellation terms.",
  },
  {
    question: "Is smoking allowed?",
    answer: "No — smoking is not permitted anywhere on the property.",
  },
];

// ── Schema.org Structured Data ───────────────────────────────────────────────
export function getLodgingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: PROPERTY.name,
    description: PROPERTY.shortDescription,
    url: PROPERTY.siteUrl,
    image: [IMAGES.hero.url, IMAGES.living1.url, IMAGES.kitchen.url, IMAGES.backyard.url],
    address: {
      "@type": "PostalAddress",
      addressLocality: PROPERTY.city,
      addressRegion: PROPERTY.addressRegion,
      addressCountry: PROPERTY.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: PROPERTY.lat,
      longitude: PROPERTY.lng,
    },
    numberOfRooms: PROPERTY.bedrooms,
    amenityFeature: AMENITIES.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.label,
      value: true,
    })),
    starRating: {
      "@type": "Rating",
      ratingValue: PROPERTY.rating,
      bestRating: 5,
      ratingCount: PROPERTY.reviewCount,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: PROPERTY.rating,
      reviewCount: PROPERTY.reviewCount,
      bestRating: 5,
    },
    priceRange: "$$$",
    sameAs: [PROPERTY.airbnbUrl],
  };
}
