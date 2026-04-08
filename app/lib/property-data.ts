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

// ── Image base URL ──────────────────────────────────────────────────────────
const BASE =
  "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzI0MTcyMzY2NDg2ODc2MDUx/original/";

function img(filename: string, alt: string, caption?: string): GalleryImage {
  return { url: `${BASE}${filename}`, alt, caption };
}

export const IMAGES = {
  hero: img("0fb0755d-0c7e-4cb5-a990-779494ef9559.jpeg", "Harbor on 23rd exterior view"),
  bedroom1: img("063c8df6-b539-4a50-ada5-9ad9896c6f54.jpeg", "Bedroom with bunk beds"),
  bedroom2: img("f51ddd26-8b58-405c-9e12-c1422fe7b864.jpeg", "Queen bedroom"),
  bedroom3: img("4b3c9eb4-2211-42a4-897d-088121b3568c.jpeg", "Cozy queen bedroom"),
  bedroom4: img("1ab5b076-b11d-4f51-98f7-bc68ee7028a0.jpeg", "Master bedroom with queen and bunks"),
  living1: img("c5e54af7-a0f6-4ee3-87f3-935d8c178d33.jpeg", "Spacious living room"),
  living2: img("fb0bad41-d537-4aa6-bc3c-52ec5917bd90.jpeg", "Living area with fireplace"),
  kitchen: img("3f21f60d-8c4c-4456-a241-11b26a56dcdf.jpeg", "Full kitchen"),
  dining: img("4f68c757-ca48-4528-88a1-6aaee44811e5.jpeg", "Dining area with large table"),
  gameRoom: img("54ee0570-3922-4853-8a6c-b2d4088f3e66.jpeg", "Game room"),
  backyard: img("65cc9bdc-1308-4d01-a0df-1b09ddaab09f.jpeg", "Fenced backyard"),
  firePit: img("c3c3768f-3ce2-41fa-935b-0386eea9c425.jpeg", "Outdoor fire pit"),
  patio: img("ab9428af-b4c7-48e6-b793-2b93ebebb492.jpeg", "Back patio with outdoor furniture"),
  bathroom1: img("c60f05d4-cce4-40a5-a06f-a098af239499.jpeg", "Full bathroom"),
  exterior2: img("654ff099-1a67-4ec1-986d-e20e0e7e4447.jpeg", "Property exterior"),
  exterior3: img("34528ab5-b67e-4ada-a56d-6ebe2591b886.jpeg", "Front of house"),
};

export const GALLERY: GalleryImage[] = [
  img("0fb0755d-0c7e-4cb5-a990-779494ef9559.jpeg", "Harbor on 23rd exterior"),
  img("c5e54af7-a0f6-4ee3-87f3-935d8c178d33.jpeg", "Spacious living room"),
  img("3f21f60d-8c4c-4456-a241-11b26a56dcdf.jpeg", "Full kitchen with stainless appliances"),
  img("54ee0570-3922-4853-8a6c-b2d4088f3e66.jpeg", "Game room"),
  img("4f68c757-ca48-4528-88a1-6aaee44811e5.jpeg", "Dining room"),
  img("063c8df6-b539-4a50-ada5-9ad9896c6f54.jpeg", "Bunk bedroom – sleeps 4"),
  img("f51ddd26-8b58-405c-9e12-c1422fe7b864.jpeg", "Queen bedroom"),
  img("4b3c9eb4-2211-42a4-897d-088121b3568c.jpeg", "Cozy queen bedroom"),
  img("1ab5b076-b11d-4f51-98f7-bc68ee7028a0.jpeg", "Bedroom 4 – queen + bunks"),
  img("c3c3768f-3ce2-41fa-935b-0386eea9c425.jpeg", "Fire pit area"),
  img("65cc9bdc-1308-4d01-a0df-1b09ddaab09f.jpeg", "Fenced backyard"),
  img("ab9428af-b4c7-48e6-b793-2b93ebebb492.jpeg", "Outdoor patio"),
  img("c60f05d4-cce4-40a5-a06f-a098af239499.jpeg", "Bathroom"),
  img("654ff099-1a67-4ec1-986d-e20e0e7e4447.jpeg", "Exterior – driveway view"),
  img("34528ab5-b67e-4ada-a56d-6ebe2591b886.jpeg", "Front of house"),
  img("de53f7f4-e676-446a-95a5-dc052c9bf1dd.jpeg", "Bedroom detail"),
  img("8a47fc3e-4416-427a-b477-12eda2798e89.jpeg", "Bedroom 2 detail"),
  img("5a438854-66cd-472f-9eb7-ab3798f2ab41.jpeg", "Living area detail"),
  img("72fc2ea3-2d08-4265-9f88-86b17be237d3.jpeg", "Kitchen detail"),
  img("67d653c0-ddb0-4f2b-95a5-0b86744b8a91.jpeg", "Dining detail"),
  img("290cbe01-65ff-4892-b06c-598058c8b647.jpeg", "Outdoor space"),
  img("c8f42df2-7565-454e-b00b-cc50d4598725.jpeg", "Backyard view"),
  img("d226d74d-5ee8-4555-b383-b043c08e99bf.jpeg", "Another view"),
  img("66883da3-c713-453d-8a8f-25f47c3ee16d.jpeg", "Interior"),
  img("e5a1e4de-9142-46a2-972f-04b35d855bb3.jpeg", "Property feature"),
  img("533bac5d-b460-4acf-9e10-af7cafd8ffc1.jpeg", "Property feature"),
  img("555f0872-4aa0-4981-a249-0da84aae8d06.jpeg", "Property feature"),
  img("f647bdd5-d4f4-4463-94d8-1cc8047ed49f.jpeg", "Exterior detail"),
  img("5497032d-b9cf-4a19-9376-a4f372d26642.jpeg", "Living space"),
  img("fe945c5a-edcb-4333-99c4-0aec29b54fc0.jpeg", "Room detail"),
  img("61675b62-9037-4e19-824e-9fa73aaac4ad.jpeg", "Room detail"),
  img("96dbb870-122b-4165-8d2d-487bd40d84e7.jpeg", "Interior space"),
  img("45f63b49-f51f-4a6c-ac55-1ee128768786.jpeg", "Interior space"),
  img("4699cdd9-dd98-4d70-a733-db07e9c50884.jpeg", "Interior space"),
  img("90e0b39b-7f43-4550-98b8-1e21e9a0c879.jpeg", "Outdoor space"),
  img("b8aaeac1-fde4-4cac-9c7c-bb7ee775ef9a.jpeg", "Property exterior"),
  img("9283282c-08be-4b0d-a6fb-43fc0cf33357.jpeg", "Property detail"),
  img("9ac3ff73-e759-4cd3-b37e-82b62176e326.jpeg", "Property detail"),
  img("8a1769a3-ea0a-4a91-b2b3-11fb75b19aaf.jpeg", "Property view"),
  img("b777a918-a22e-4ffb-af75-d067bb52307b.jpeg", "Final view"),
  img("94c81ec9-840b-402a-9256-5967b4331fe5.jpeg", "Final view"),
];

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
export const AMENITIES: Amenity[] = [
  // Outdoors & Lake
  { icon: "🌊", label: "Lake access (Lake Como)", category: "Outdoors" },
  { icon: "🏖️", label: "Private beach access", category: "Outdoors" },
  { icon: "🔥", label: "Fire pit", category: "Outdoors" },
  { icon: "🌿", label: "Fully fenced backyard", category: "Outdoors" },
  { icon: "🪑", label: "Outdoor furniture & patio", category: "Outdoors" },
  { icon: "🔩", label: "BBQ grill (charcoal)", category: "Outdoors" },
  // Entertainment
  { icon: "🎮", label: "Game room", category: "Entertainment" },
  { icon: "📺", label: "HDTV with Netflix, Hulu, Disney+", category: "Entertainment" },
  { icon: "🎲", label: "Board games & puzzles", category: "Entertainment" },
  { icon: "📚", label: "Books, toys for all ages", category: "Entertainment" },
  // Kitchen
  { icon: "🍳", label: "Full gourmet kitchen", category: "Kitchen" },
  { icon: "🥘", label: "Whirlpool gas stove & oven", category: "Kitchen" },
  { icon: "❄️", label: "Full-size refrigerator + mini fridge", category: "Kitchen" },
  { icon: "🫙", label: "Dishwasher", category: "Kitchen" },
  { icon: "☕", label: "Keurig coffee maker", category: "Kitchen" },
  { icon: "🍷", label: "Wine glasses & blender", category: "Kitchen" },
  // Comfort
  { icon: "🛏️", label: "Luxury Malouf bamboo/Tencel sheets", category: "Comfort" },
  { icon: "🔥", label: "Gas indoor fireplace", category: "Comfort" },
  { icon: "❄️", label: "Central A/C & heat", category: "Comfort" },
  { icon: "🌑", label: "Room-darkening shades", category: "Comfort" },
  { icon: "🧺", label: "Washer & dryer in-unit", category: "Comfort" },
  { icon: "💨", label: "Hair dryer & iron", category: "Comfort" },
  // Family
  { icon: "👶", label: "Crib & Pack 'n play available", category: "Family" },
  { icon: "🧸", label: "Children's toys & books", category: "Family" },
  { icon: "🥄", label: "Children's dinnerware", category: "Family" },
  // Parking & Access
  { icon: "🚗", label: "Free parking (2 garage + 3-4 driveway)", category: "Parking" },
  { icon: "🔑", label: "Self check-in / keypad entry", category: "Parking" },
  { icon: "📶", label: "High-speed WiFi", category: "Parking" },
  // Safety
  { icon: "🔥", label: "Fire extinguisher & first aid kit", category: "Safety" },
  { icon: "💨", label: "Smoke & CO detectors", category: "Safety" },
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
    distance: "8 miles",
    description: "Championship 18-hole course at the iconic Grand Geneva Resort.",
  },
  {
    name: "Grand Geneva Resort – The Highlands",
    distance: "8 miles",
    description: "A Scottish links-style course with stunning Wisconsin scenery.",
  },
  {
    name: "Geneva National Golf Club",
    distance: "6 miles",
    description: "Three world-class 18-hole courses designed by Arnold Palmer, Lee Trevino & Gary Player.",
  },
  {
    name: "Abbey Springs Golf Course",
    distance: "4 miles",
    description: "Beautiful lakeside course with views of Fontana-on-Geneva Lake.",
  },
  {
    name: "Hawk's View Golf Club",
    distance: "12 miles",
    description: "Award-winning course with dramatic elevation changes and stunning views.",
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
    question: "How far is Lake Geneva from Chicago and Milwaukee?",
    answer:
      "Lake Geneva is approximately 1 hour north of Chicago and 1 hour south of Milwaukee, making it a perfect weekend getaway destination from either city.",
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
