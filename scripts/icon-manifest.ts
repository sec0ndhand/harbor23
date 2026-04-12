/**
 * Icon manifest — the single source of truth for the clay-style icon library.
 *
 * Every icon used anywhere in the site is declared here. Each entry has:
 *   - key: a kebab-case id (also the PNG filename stem)
 *   - subject: the prompt fragment sent to the image model
 *   - alt: the accessibility alt text rendered on the <img>
 *   - emoji: a graceful fallback character the Icon component renders until
 *     the real PNG exists at app/assets/icons/<key>.png
 *
 * When a new concept is needed on the site, add an entry here first — then
 * app/lib/icons.ts picks it up automatically. Run scripts/generate-icons.ts
 * to produce PNGs; the component upgrades with zero code changes.
 */

export interface IconManifestEntry {
  key: string;
  subject: string;
  alt: string;
  emoji: string;
}

export const ICON_MANIFEST = [
  // ── Outdoors & Lake ─────────────────────────────────────────────────────
  {
    key: "lake-access",
    subject:
      "a tiny wooden dock with two Adirondack chairs facing calm blue lake water",
    alt: "Lake access",
    emoji: "🌊",
  },
  {
    key: "private-beach",
    subject:
      "a small sandy beach scene with a striped umbrella and a folded beach towel",
    alt: "Private beach",
    emoji: "🏖️",
  },
  {
    key: "fire-pit",
    subject: "a glowing stone fire pit with logs and soft orange sparks",
    alt: "Outdoor fire pit",
    emoji: "🔥",
  },
  {
    key: "fenced-backyard",
    subject:
      "a fenced green backyard with a small garden and white picket edges",
    alt: "Fenced backyard",
    emoji: "🌿",
  },
  {
    key: "patio",
    subject: "an outdoor patio with a wicker chair and a small round table",
    alt: "Patio and outdoor furniture",
    emoji: "🪑",
  },
  {
    key: "grill",
    subject: "a charcoal barbecue grill with smoke and glowing coals",
    alt: "BBQ grill",
    emoji: "🍖",
  },

  // ── Entertainment ───────────────────────────────────────────────────────
  {
    key: "game-room",
    subject: "a green pool table with billiard balls and a wooden cue",
    alt: "Game room",
    emoji: "🎱",
  },
  {
    key: "hdtv",
    subject: "a flat-screen TV showing a colorful abstract image",
    alt: "HDTV with streaming apps",
    emoji: "📺",
  },
  {
    key: "board-games",
    subject: "a stack of board game boxes with dice and two puzzle pieces",
    alt: "Board games and puzzles",
    emoji: "🎲",
  },
  {
    key: "books-toys",
    subject: "a stack of books next to a plush teddy bear",
    alt: "Books and toys for all ages",
    emoji: "📚",
  },

  // ── Kitchen ─────────────────────────────────────────────────────────────
  {
    key: "gourmet-kitchen",
    subject: "a butter-yellow stand mixer next to a loaf of fresh bread",
    alt: "Full gourmet kitchen",
    emoji: "🍳",
  },
  {
    key: "gas-stove",
    subject: "a stainless steel gas stove with a flame beneath a copper pot",
    alt: "Gas stove and oven",
    emoji: "🥘",
  },
  {
    key: "refrigerator",
    subject: "a vintage cream-colored refrigerator with a small magnet",
    alt: "Full refrigerator plus mini fridge",
    emoji: "❄️",
  },
  {
    key: "dishwasher",
    subject: "a clean white plate with sparkles and a small water droplet",
    alt: "Dishwasher",
    emoji: "🍽️",
  },
  {
    key: "coffee",
    subject: "a steaming mug of coffee on a small wooden saucer",
    alt: "Keurig coffee maker",
    emoji: "☕",
  },
  {
    key: "wine-glasses",
    subject: "two wine glasses clinking together with a soft red pour",
    alt: "Wine glasses",
    emoji: "🍷",
  },

  // ── Comfort ─────────────────────────────────────────────────────────────
  {
    key: "bedroom",
    subject:
      "a neatly made bed with a fluffy pillow and a folded blue blanket",
    alt: "Bedroom with luxury sheets",
    emoji: "🛏️",
  },
  {
    key: "fireplace",
    subject: "an indoor brick fireplace with a warm orange flame",
    alt: "Indoor gas fireplace",
    emoji: "🔥",
  },
  {
    key: "air-conditioning",
    subject: "a small white air conditioner with a soft blue wind swirl",
    alt: "Central A/C and heat",
    emoji: "❄️",
  },
  {
    key: "blackout-shades",
    subject: "a window with heavy drawn curtains and a crescent moon outside",
    alt: "Room-darkening shades",
    emoji: "🌙",
  },
  {
    key: "washer-dryer",
    subject: "a front-loading washing machine with a folded towel on top",
    alt: "Washer and dryer in unit",
    emoji: "🧺",
  },
  {
    key: "hair-dryer",
    subject: "a pink hair dryer with a tiny wind gust",
    alt: "Hair dryer and iron",
    emoji: "💨",
  },

  // ── Family ──────────────────────────────────────────────────────────────
  {
    key: "crib",
    subject: "a miniature white crib with a small teddy bear peeking out",
    alt: "Crib and pack-n-play available",
    emoji: "👶",
  },
  {
    key: "toys",
    subject: "a plush teddy bear next to a stack of colorful wooden blocks",
    alt: "Children's toys and books",
    emoji: "🧸",
  },
  {
    key: "kids-dinnerware",
    subject: "a small bowl and a tiny spoon with a smiling face",
    alt: "Children's dinnerware",
    emoji: "🥄",
  },

  // ── Parking & Access ────────────────────────────────────────────────────
  {
    key: "parking",
    subject: "a small red car parked in front of a wooden garage door",
    alt: "Free parking",
    emoji: "🚗",
  },
  {
    key: "self-checkin",
    subject: "a brass door key hanging from a small tag",
    alt: "Self check-in with keypad",
    emoji: "🔑",
  },
  {
    key: "wifi",
    subject: "a small wifi router with a soft blue signal wave above it",
    alt: "High-speed WiFi",
    emoji: "📶",
  },

  // ── Safety ──────────────────────────────────────────────────────────────
  {
    key: "fire-safety",
    subject: "a red fire extinguisher with a yellow label",
    alt: "Fire extinguisher and first aid kit",
    emoji: "🧯",
  },
  {
    key: "smoke-detector",
    subject: "a small round smoke detector with a blinking green light",
    alt: "Smoke and carbon monoxide detectors",
    emoji: "🚨",
  },

  // ── Experiences: Golf ───────────────────────────────────────────────────
  {
    key: "golf",
    subject: "a white golf ball on a tiny wooden tee with a driver leaning beside it",
    alt: "Golf courses nearby",
    emoji: "⛳",
  },
  {
    key: "cheers",
    subject: "two beer mugs clinking with foamy tops",
    alt: "Post-round drinks at the 19th hole",
    emoji: "🍺",
  },

  // ── Experiences: Bachelorette ───────────────────────────────────────────
  {
    key: "champagne-toast",
    subject: "two champagne flutes clinking together with pink bubbles",
    alt: "Private estate for celebrating",
    emoji: "🥂",
  },
  {
    key: "spa",
    subject: "a rolled white towel with two pink lotus blossoms on top",
    alt: "Spa day nearby",
    emoji: "💆",
  },

  // ── Experiences: Family ─────────────────────────────────────────────────
  {
    key: "ice-cream",
    subject: "a pink ice cream cone with a single scoop",
    alt: "Ice cream in downtown Lake Geneva",
    emoji: "🍦",
  },
  {
    key: "boat-tour",
    subject: "a small white ferry boat on blue water with a tiny flag",
    alt: "Lake Geneva cruise line",
    emoji: "⛴️",
  },
  {
    key: "walking-path",
    subject: "a winding dirt path between two small trees",
    alt: "Geneva Lake Shore Path",
    emoji: "🚶",
  },
  {
    key: "observatory",
    subject: "a small white domed observatory under a purple starry sky",
    alt: "Yerkes Observatory nearby",
    emoji: "🔭",
  },
  {
    key: "skiing",
    subject: "a pair of crossed skis and poles in soft snow",
    alt: "Winter skiing nearby",
    emoji: "⛷️",
  },
  {
    key: "live-music",
    subject: "a music note floating above a tiny acoustic guitar",
    alt: "Live music theatres nearby",
    emoji: "🎶",
  },

  // ── Location callouts ──────────────────────────────────────────────────
  {
    key: "map-pin",
    subject:
      "a red map pin planted on a small rolling green hill with a tiny road",
    alt: "Location pin",
    emoji: "📍",
  },
  {
    key: "city-skyline",
    subject:
      "a simple city skyline with three small buildings and a round sun",
    alt: "City skyline",
    emoji: "🏙️",
  },
  {
    key: "house",
    subject: "a tiny cozy house with a red roof, two windows, and a chimney",
    alt: "Private lake house",
    emoji: "🏠",
  },
  {
    key: "guests",
    subject: "three cheerful little silhouettes standing together",
    alt: "Group of guests",
    emoji: "👥",
  },
  {
    key: "bathroom",
    subject: "a white porcelain bathtub with a few soap bubbles",
    alt: "Bathrooms",
    emoji: "🛁",
  },
  {
    key: "door",
    subject: "a welcoming blue front door with a brass handle",
    alt: "Check-out door",
    emoji: "🚪",
  },
  {
    key: "no-pets",
    subject:
      "a small paw print inside a soft circle with a gentle line through it",
    alt: "No pets allowed",
    emoji: "🐾",
  },
  {
    key: "quiet-hours",
    subject: "a small bell with its clapper muted and a soft moon beside it",
    alt: "Quiet hours",
    emoji: "🔕",
  },
  {
    key: "no-smoking",
    subject: "a red circle with a soft slash through a tiny cloud",
    alt: "No smoking, no parties",
    emoji: "🚫",
  },
  {
    key: "wine-dining",
    subject:
      "a stemmed wine glass next to a small plate with cheese and grapes",
    alt: "Wine and dining",
    emoji: "🍷",
  },
  {
    key: "sparkle",
    subject: "a soft pink sparkle with two smaller stars around it",
    alt: "Spa and relaxation",
    emoji: "✨",
  },
] as const satisfies readonly IconManifestEntry[];

export type IconName = (typeof ICON_MANIFEST)[number]["key"];

// Build a lookup map once at module load — faster than filter() on every
// icon render at runtime.
export const ICON_LOOKUP: Record<string, IconManifestEntry> =
  Object.fromEntries(ICON_MANIFEST.map((entry) => [entry.key, entry]));

// The art-direction preamble shared by every generation call. Keeping this
// in one place guarantees every image has the same style DNA.
export const ICON_SYSTEM_PROMPT = `Claymation-style 3D illustration with tilt-shift shallow depth-of-field.
Soft studio lighting, warm pastel palette (sunny yellows, lake blues, sage greens, cream).
Handcrafted clay/plasticine texture with visible fingerprints and soft edges.
Centered single subject on a transparent background.
Slightly oversaturated, cheerful, Airbnb-marketing aesthetic.
Square 1024x1024. No text, no logos, no humans unless specified.`;
