export const OAKLINE_CATEGORIES = [
  "Sofas",
  "Beds",
  "Dining Tables",
  "Wardrobes",
  "Chairs",
  "Coffee Tables",
] as const;

export type OaklineCategory = (typeof OAKLINE_CATEGORIES)[number];

export interface OaklineCategoryInfo {
  name: OaklineCategory;
  slug: string;
  tagline: string;
  image: string;
}

export interface OaklineProduct {
  id: string;
  name: string;
  category: OaklineCategory;
  price: number;
  badge?: "Best Seller" | "New Arrival" | "Made to Order";
  dimensions: string;
  material: string;
  finishes: readonly string[];
  description: string;
  careNote: string;
  image: string;
}

export interface OaklineCollection {
  id: string;
  title: string;
  subtitle: string;
  categoryFilter: OaklineCategory;
  image: string;
  pieceCount: number;
}

export interface OaklineTestimonial {
  id: string;
  quote: string;
  author: string;
  roleOrCity: string;
  piece: string;
}

export const oaklineNav = [
  { label: "Categories", href: "#oak-categories" },
  { label: "Best Sellers", href: "#oak-products" },
  { label: "Collections", href: "#oak-collections" },
  { label: "Our Story", href: "#oak-story" },
  { label: "Reviews", href: "#oak-reviews" },
] as const;

export const oaklineCategories: readonly OaklineCategoryInfo[] = [
  {
    name: "Sofas",
    slug: "sofas",
    tagline: "Deep-seated Belgian linen & kiln-dried oak frames.",
    image: "/templates/oakline-interiors/cat-sofas.jpg",
  },
  {
    name: "Beds",
    slug: "beds",
    tagline: "Low-profile platform silhouettes with mortise joinery.",
    image: "/templates/oakline-interiors/cat-beds.jpg",
  },
  {
    name: "Dining Tables",
    slug: "dining-tables",
    tagline: "Solid timber slabs crafted for daily gathering.",
    image: "/templates/oakline-interiors/cat-dining.jpg",
  },
  {
    name: "Wardrobes",
    slug: "wardrobes",
    tagline: "Fluted oak doors, natural rattan & brass hardware.",
    image: "/templates/oakline-interiors/cat-wardrobes.jpg",
  },
  {
    name: "Chairs",
    slug: "chairs",
    tagline: "Sculpted backrests paired with saddle leather & bouclé.",
    image: "/templates/oakline-interiors/cat-chairs.jpg",
  },
  {
    name: "Coffee Tables",
    slug: "coffee-tables",
    tagline: "Curved white oak & honed travertine centrepieces.",
    image: "/templates/oakline-interiors/cat-coffee-tables.jpg",
  },
];

export const oaklineProducts: readonly OaklineProduct[] = [
  {
    id: "sora-three-seater",
    name: "Sora Bouclé 3-Seater Sofa",
    category: "Sofas",
    price: 78500,
    badge: "Best Seller",
    dimensions: "224 × 94 × 76 cm",
    material: "Solid European White Oak · Ivory Bouclé",
    finishes: ["Natural White Oak", "Warm Ash", "Smoked Walnut"],
    description:
      "Generously proportioned three-seater with down-wrapped cushions, an exposed white oak plinth, and removable Belgian bouclé covers.",
    careNote: "Vacuum upholstery weekly with a soft brush; blot spills immediately.",
    image: "/templates/oakline-interiors/cat-sofas.jpg",
  },
  {
    id: "kanso-linen-sectional",
    name: "Kanso Modular Linen Sofa",
    category: "Sofas",
    price: 112000,
    badge: "Made to Order",
    dimensions: "280 × 102 × 74 cm",
    material: "Kiln-Dried Ash · Heavyweight Oatmeal Linen",
    finishes: ["Natural White Oak", "Smoked Walnut"],
    description:
      "Low architectural seating designed for open-plan living rooms. Clips discreetly beneath the base for effortless reconfiguration.",
    careNote: "Dry-clean removable slipcovers; wipe oak plinth with a dry microfibre cloth.",
    image: "/templates/oakline-interiors/hero-showroom.jpg",
  },
  {
    id: "alba-platform-bed",
    name: "Alba Joinery Platform Bed",
    category: "Beds",
    price: 68900,
    badge: "Best Seller",
    dimensions: "212 × 188 × 92 cm (King)",
    material: "Solid White Oak · Japanese Wedged Tenon Joinery",
    finishes: ["Natural White Oak", "Smoked Walnut", "Warm Ash"],
    description:
      "Clean cantilevered rails and a softly angled solid oak headboard create an airy, grounded sanctuary without visible metal fasteners.",
    careNote: "Refresh timber once a year with natural matte beeswax oil.",
    image: "/templates/oakline-interiors/cat-beds.jpg",
  },
  {
    id: "nori-linen-headboard-bed",
    name: "Nori Upholstered Oak Bed",
    category: "Beds",
    price: 74500,
    badge: "New Arrival",
    dimensions: "215 × 192 × 104 cm (King)",
    material: "Solid Teak & Oak Frame · Unbleached Linen",
    finishes: ["Warm Ash", "Natural White Oak"],
    description:
      "Cushioned twin headboard panels wrapped in breathable flax linen meet a sturdy slatted solid timber platform.",
    careNote: "Spot clean linen headboard with mild soap solution; avoid direct afternoon glare.",
    image: "/templates/oakline-interiors/collection-bedroom.jpg",
  },
  {
    id: "maris-dining-table",
    name: "Maris Solid Oak Dining Table",
    category: "Dining Tables",
    price: 64000,
    badge: "Best Seller",
    dimensions: "210 × 98 × 75 cm (Seats 8)",
    material: "40mm Book-Matched Solid White Oak",
    finishes: ["Natural White Oak", "Smoked Walnut"],
    description:
      "Hand-chamfered tabletop edges reveal continuous oak grain while tapered trestle legs leave generous knee room for eight.",
    careNote: "Use coasters for hot cookware; wipe with damp cloth and dry immediately.",
    image: "/templates/oakline-interiors/cat-dining.jpg",
  },
  {
    id: "solis-round-bistro-table",
    name: "Solis Fluted Pedestal Table",
    category: "Dining Tables",
    price: 52500,
    dimensions: "135 cm Dia × 75 cm (Seats 4–6)",
    material: "Solid White Oak · Fluted Drum Base",
    finishes: ["Natural White Oak", "Warm Ash", "Smoked Walnut"],
    description:
      "A sculptural fluted cylinder base anchors this intimate round table crafted for warm conversation in compact dining alcoves.",
    careNote: "Protected with zero-VOC matte polyurethane against everyday spills.",
    image: "/templates/oakline-interiors/cat-dining.jpg",
  },
  {
    id: "vela-rattan-wardrobe",
    name: "Vela Fluted Oak & Cane Wardrobe",
    category: "Wardrobes",
    price: 89500,
    badge: "Best Seller",
    dimensions: "120 × 60 × 205 cm",
    material: "Fluted Solid Oak · Natural Indonesian Rattan · Brushed Brass",
    finishes: ["Natural White Oak", "Warm Ash"],
    description:
      "Tall vertical flutes and breathable cane panels house adjustable cedar shelves, a full-length hanging rail, and soft-close drawers.",
    careNote: "Dust rattan weave gently with a soft brush; avoid excess moisture.",
    image: "/templates/oakline-interiors/cat-wardrobes.jpg",
  },
  {
    id: "linen-double-armoire",
    name: "Atelier Double Door Armoire",
    category: "Wardrobes",
    price: 96000,
    badge: "Made to Order",
    dimensions: "145 × 62 × 210 cm",
    material: "Solid Oak Veneer & Hardwood Core · Antique Brass Pulls",
    finishes: ["Natural White Oak", "Smoked Walnut"],
    description:
      "Architectural bedroom storage featuring full-height solid timber pulls and modular interior compartments.",
    careNote: "Wipe brass pulls with a dry soft cloth; keep hinges dust-free.",
    image: "/templates/oakline-interiors/collection-bedroom.jpg",
  },
  {
    id: "arbor-leather-lounge",
    name: "Arbor Saddle-Leather Lounge Chair",
    category: "Chairs",
    price: 38500,
    badge: "Best Seller",
    dimensions: "72 × 78 × 74 cm",
    material: "Sculpted Smoked Walnut · Full-Grain Cognac Leather",
    finishes: ["Smoked Walnut", "Natural White Oak"],
    description:
      "Hand-shaped walnut armrests curve effortlessly around a stitched vegetable-tanned saddle leather sling that ages with rich patina.",
    careNote: "Condition full-grain leather every 6 months with neutral balm.",
    image: "/templates/oakline-interiors/cat-chairs.jpg",
  },
  {
    id: "eloise-boucle-accent",
    name: "Eloise Curved Dining & Accent Chair",
    category: "Chairs",
    price: 21500,
    badge: "New Arrival",
    dimensions: "56 × 54 × 78 cm",
    material: "Steam-Bent White Oak · Textured Bouclé",
    finishes: ["Natural White Oak", "Warm Ash"],
    description:
      "Steam-bent crescent backrest hugs the shoulders for multi-hour dining comfort without visual bulk.",
    careNote: "Spot clean fabric seat; tighten under-seat bolts annually.",
    image: "/templates/oakline-interiors/collection-living.jpg",
  },
  {
    id: "tala-travertine-coffee",
    name: "Tala Oak & Travertine Coffee Table",
    category: "Coffee Tables",
    price: 34500,
    badge: "Best Seller",
    dimensions: "125 × 72 × 36 cm",
    material: "Honed Beige Travertine · Solid White Oak",
    finishes: ["Natural White Oak", "Smoked Walnut"],
    description:
      "Organic curved travertine stone rests recessed within a chamfered oak apron, balancing mineral texture and warm timber.",
    careNote: "Travertine is pre-sealed; wipe acidic spills promptly.",
    image: "/templates/oakline-interiors/cat-coffee-tables.jpg",
  },
  {
    id: "pebble-nesting-tables",
    name: "Pebble Solid Oak Nesting Set",
    category: "Coffee Tables",
    price: 27900,
    dimensions: "90 × 60 × 38 cm + 55 × 45 × 32 cm",
    material: "Kiln-Dried Solid White Oak",
    finishes: ["Natural White Oak", "Warm Ash", "Smoked Walnut"],
    description:
      "Pair of asymmetrical rounded tables crafted to nest together or scatter beside lounge seating as needed.",
    careNote: "Wipe with dry cloth; avoid placing uninsulated hot mugs directly.",
    image: "/templates/oakline-interiors/hero-showroom.jpg",
  },
];

export const oaklineCollections: readonly OaklineCollection[] = [
  {
    id: "quiet-living",
    title: "The Quiet Living Edit",
    subtitle: "Low-slung linen seating, travertine stone, and calm plaster tones.",
    categoryFilter: "Sofas",
    image: "/templates/oakline-interiors/collection-living.jpg",
    pieceCount: 14,
  },
  {
    id: "sanctuary-bedroom",
    title: "Sanctuary Bedroom Suite",
    subtitle: "Wedged-tenon oak beds, fluted cane storage, and raw Belgian flax.",
    categoryFilter: "Beds",
    image: "/templates/oakline-interiors/collection-bedroom.jpg",
    pieceCount: 9,
  },
  {
    id: "table-gatherings",
    title: "The Gathering Table",
    subtitle: "Heirloom dining slabs and steam-bent seating made for generations.",
    categoryFilter: "Dining Tables",
    image: "/templates/oakline-interiors/cat-dining.jpg",
    pieceCount: 11,
  },
];

export const oaklineTestimonials: readonly OaklineTestimonial[] = [
  {
    id: "t1",
    quote:
      "The Maris table arrived with grain matching so seamless it looks carved from a single tree. Our dining room feels warmer the moment morning light hits it.",
    author: "Ananya Deshmukh",
    roleOrCity: "Bengaluru",
    piece: "Maris Solid Oak Dining Table",
  },
  {
    id: "t2",
    quote:
      "We specify Oakline for residential projects because their joinery holds up to real family life and their white-glove team actually checks floor levels on delivery.",
    author: "Rohan Mehta",
    roleOrCity: "Principal Architect, Mumbai",
    piece: "Sora Bouclé 3-Seater & Tala Table",
  },
  {
    id: "t3",
    quote:
      "Ordering timber swatches first gave us complete confidence. The Vela wardrobe smells softly of cedar and the rattan detailing is impeccable.",
    author: "Meera & Kabir Nair",
    roleOrCity: "Hyderabad",
    piece: "Vela Fluted Oak & Cane Wardrobe",
  },
];

export const formatOaklinePrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

