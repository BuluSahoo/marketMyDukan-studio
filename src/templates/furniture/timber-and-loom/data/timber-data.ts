export const TIMBER_CATEGORIES = [
  "Sofas",
  "Beds",
  "Dining",
  "Chairs",
  "Storage",
  "Lighting",
] as const;

export type TimberCategory = (typeof TIMBER_CATEGORIES)[number];

export interface TimberProduct {
  id: string;
  name: string;
  category: TimberCategory;
  price: number;
  shortDesc: string;
  details: string;
  dimensions: string;
  materials: string;
  finishes: readonly string[];
  leadTime: string;
  image: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface TimberCollection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  categoryFilter: TimberCategory;
  image: string;
}

export interface TimberTestimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  piece: string;
}

export const timberNav = [
  { label: "Collections", href: "#tl-collections" },
  { label: "Best Sellers", href: "#tl-bestsellers" },
  { label: "New Arrivals", href: "#tl-new" },
  { label: "Philosophy", href: "#tl-philosophy" },
  { label: "Spaces", href: "#tl-lifestyle" },
] as const;

export const timberProducts: readonly TimberProduct[] = [
  {
    id: "kaveri-charcoal-sofa",
    name: "Kaveri Smoked Walnut & Bouclé Sofa",
    category: "Sofas",
    price: 124000,
    shortDesc: "Deep charcoal handloom bouclé suspended inside an exposed walnut cradle.",
    details:
      "Hand-shaped solid smoked walnut side rails embrace feather-wrapped charcoal wool bouclé cushions for low-slung evening lounging.",
    dimensions: "230 × 96 × 74 cm",
    materials: "Smoked Burma Teak & Handloom Charcoal Bouclé",
    finishes: ["Smoked Walnut / Obsidian", "Ebonized Teak / Slate", "Burnished Oak / Sand"],
    leadTime: "Made to order · 3–4 weeks",
    image: "/templates/timber-and-loom/cat-sofas.jpg",
    isBestSeller: true,
  },
  {
    id: "deccan-loom-divan",
    name: "Deccan Handloom Lounge Sofa",
    category: "Sofas",
    price: 108500,
    shortDesc: "Architectural timber deck paired with natural hand-spun oatmeal linen.",
    details:
      "Designed for quiet evening light with an extended solid timber armrest ledge and wide mortise-joined legs.",
    dimensions: "218 × 94 × 72 cm",
    materials: "Seasoned Teak · Unbleached Khadi Wool Blend",
    finishes: ["Smoked Walnut / Oatmeal", "Ebonized Teak / Warm Sand"],
    leadTime: "In stock · Ships in 7 days",
    image: "/templates/timber-and-loom/hero-dark-lounge.jpg",
    isNewArrival: true,
  },
  {
    id: "surya-cane-bed",
    name: "Surya Woven Cane & Teak Bed",
    category: "Beds",
    price: 94000,
    shortDesc: "Low cantilevered platform framed in dark teak with hand-plaited rattan.",
    details:
      "Breathable double-weave natural rattan headboard meets recessed solid timber rails and floating bedside brackets.",
    dimensions: "216 × 192 × 98 cm (King)",
    materials: "Kiln-Dried Smoked Teak · Natural Cane",
    finishes: ["Smoked Walnut / Natural Cane", "Ebonized Teak / Smoked Cane"],
    leadTime: "In stock · Ships in 10 days",
    image: "/templates/timber-and-loom/cat-beds.jpg",
    isBestSeller: true,
  },
  {
    id: "mandala-platform-bed",
    name: "Mandala Charcoal Linen Platform",
    category: "Beds",
    price: 86500,
    shortDesc: "Minimalist mitered timber frame grounded on recessed brass plinths.",
    details:
      "Engineered with silent wooden slats and generous chamfered perimeter ledges that double as night shelves.",
    dimensions: "212 × 184 × 86 cm (King)",
    materials: "Charred Oak & Brushed Aged Brass",
    finishes: ["Charred Oak", "Smoked Walnut"],
    leadTime: "Made to order · 3 weeks",
    image: "/templates/timber-and-loom/cat-beds.jpg",
    isNewArrival: true,
  },
  {
    id: "malabar-dining-table",
    name: "Malabar Chamfered Dining Table",
    category: "Dining",
    price: 98000,
    shortDesc: "Monumental eight-seater solid walnut table with knife-edge bevel.",
    details:
      "Hand-rubbed in pure tung oil so the dark grain catches warm candle and pendant light across evening gatherings.",
    dimensions: "240 × 104 × 75 cm (Seats 8–10)",
    materials: "Solid Smoked Walnut · Hand-Rubbed Tung Oil",
    finishes: ["Smoked Walnut", "Ebonized Teak"],
    leadTime: "In stock · Ships in 10 days",
    image: "/templates/timber-and-loom/cat-dining.jpg",
    isBestSeller: true,
  },
  {
    id: "trestle-courtyard-table",
    name: "Courtyard Pavilion Dining Table",
    category: "Dining",
    price: 82000,
    shortDesc: "Balanced architectural trestle legs supporting a 42mm solid timber top.",
    details:
      "Wedged bridle joints lock the underframe securely without a single visible screw.",
    dimensions: "195 × 96 × 75 cm (Seats 6–8)",
    materials: "Seasoned Indian Teak",
    finishes: ["Warm Teak", "Smoked Walnut"],
    leadTime: "Made to order · 3 weeks",
    image: "/templates/timber-and-loom/lifestyle-courtyard.jpg",
  },
  {
    id: "chamba-leather-armchair",
    name: "Chamba Walnut & Saddle Chair",
    category: "Chairs",
    price: 46500,
    shortDesc: "Sculpted dark walnut frame cradling hand-stitched cognac saddle leather.",
    details:
      "Each armrest is carved by hand to follow the natural turn of the wrist, paired with brass pin joinery.",
    dimensions: "74 × 80 × 75 cm",
    materials: "Smoked Walnut · Vegetable-Tanned Leather · Brass",
    finishes: ["Smoked Walnut / Cognac", "Ebonized Teak / Espresso"],
    leadTime: "In stock · Ships in 5 days",
    image: "/templates/timber-and-loom/cat-chairs.jpg",
    isBestSeller: true,
  },
  {
    id: "weavers-cord-chair",
    name: "Weaver's Cord Lounge Chair",
    category: "Chairs",
    price: 38900,
    shortDesc: "Hand-laced Danish paper cord seat over a blackened teak silhouette.",
    details:
      "Over 110 metres of tightly woven cord provide breathable lumbar support with zero foam.",
    dimensions: "68 × 72 × 76 cm",
    materials: "Ebonized Teak · Natural Waxed Cord",
    finishes: ["Ebonized Teak / Black Cord", "Smoked Walnut / Oat Cord"],
    leadTime: "In stock · Ships in 7 days",
    image: "/templates/timber-and-loom/cat-chairs.jpg",
    isNewArrival: true,
  },
  {
    id: "veranda-fluted-credenza",
    name: "Veranda Fluted Storage Cabinet",
    category: "Storage",
    price: 88000,
    shortDesc: "Tall fluted timber doors inset with woven cane & aged brass pulls.",
    details:
      "Soft-close solid brass hardware conceals cedar-lined drawers and adjustable gallery shelving.",
    dimensions: "130 × 52 × 185 cm",
    materials: "Fluted Teak · Woven Cane · Aged Brass",
    finishes: ["Smoked Teak / Brass", "Natural Teak / Bronze"],
    leadTime: "Made to order · 3 weeks",
    image: "/templates/timber-and-loom/cat-storage.jpg",
    isBestSeller: true,
  },
  {
    id: "travertine-low-console",
    name: "Atelier Travertine & Timber Console",
    category: "Storage",
    price: 62500,
    shortDesc: "Low gallery plinth combining honed stone top with concealed oak drawers.",
    details:
      "Built for sculptural lighting, vinyl setups, or serene dining room service.",
    dimensions: "160 × 48 × 64 cm",
    materials: "Honed Travertine · Smoked Oak",
    finishes: ["Smoked Oak / Travertine", "Ebonized Teak / Basalt"],
    leadTime: "In stock · Ships in 10 days",
    image: "/templates/timber-and-loom/lifestyle-courtyard.jpg",
    isNewArrival: true,
  },
  {
    id: "solstice-brass-floor-lamp",
    name: "Solstice Brushed Brass Floor Lamp",
    category: "Lighting",
    price: 29500,
    shortDesc: "Slender aged-brass stem topped with a hand-loomed raw linen drum.",
    details:
      "Dimmable warm-glow LED diffuser casts soft downward pools across charcoal plaster and timber floors.",
    dimensions: "38 cm Dia × 158 cm H",
    materials: "Solid Brushed Brass · Handloom Linen",
    finishes: ["Aged Brass / Raw Linen", "Bronze / Charcoal Shade"],
    leadTime: "In stock · Ships in 4 days",
    image: "/templates/timber-and-loom/cat-lighting.jpg",
    isBestSeller: true,
  },
  {
    id: "atelier-sconce-pair",
    name: "Nocturne Cast-Bronze Wall Sconce",
    category: "Lighting",
    price: 18500,
    shortDesc: "Spun blackened bronze dome engineered for warm bedside reading light.",
    details:
      "Articulated brass swivel arm directs glare-free 2700K illumination without disturbing the room.",
    dimensions: "18 × 24 × 22 cm",
    materials: "Cast Bronze · Brushed Brass Hardware",
    finishes: ["Oil-Rubbed Bronze", "Brushed Brass"],
    leadTime: "In stock · Ships in 4 days",
    image: "/templates/timber-and-loom/cat-beds.jpg",
  },
];

export const timberCollections: readonly TimberCollection[] = [
  {
    id: "nocturne-living",
    eyebrow: "Collection 01",
    title: "Nocturne Living",
    description:
      "Smoked walnut silhouettes, heavy bouclé weaves, and blackened steel tables made for calm late-evening rooms.",
    categoryFilter: "Sofas",
    image: "/templates/timber-and-loom/hero-dark-lounge.jpg",
  },
  {
    id: "atelier-sanctuary",
    eyebrow: "Collection 02",
    title: "The Woven Sanctuary",
    description:
      "Hand-plaited rattan cane beds and oil-rubbed bronze sconces designed around tactile warmth.",
    categoryFilter: "Beds",
    image: "/templates/timber-and-loom/cat-beds.jpg",
  },
  {
    id: "brass-and-grain",
    eyebrow: "Collection 03",
    title: "Sculpted Timber & Brass",
    description:
      "Gallery-grade lounge chairs, fluted cabinets, and warm linen lighting turned by master artisans.",
    categoryFilter: "Lighting",
    image: "/templates/timber-and-loom/cat-lighting.jpg",
  },
];

export const timberTestimonials: readonly TimberTestimonial[] = [
  {
    id: "tl-1",
    quote:
      "We wanted a dark, grounded living room that never felt cold. The Kaveri sofa and Solstice brass lamp transformed the entire atmosphere at dusk.",
    author: "Vikramaditya & Rhea Kapur",
    title: "Private Residence · New Delhi",
    piece: "Kaveri Smoked Walnut Sofa & Solstice Lamp",
  },
  {
    id: "tl-2",
    quote:
      "Timber & Loom understands shadow and proportion better than almost any Indian studio. Their smoked teak finishes age like vintage architecture.",
    author: "Nandini Kulkarni",
    title: "Founding Partner, Atelier NK Architects",
    piece: "Malabar Dining Table & Chamba Chairs",
  },
  {
    id: "tl-3",
    quote:
      "From the hand-rubbed tung oil scent on delivery day to the brass joinery pins, every detail feels considered.",
    author: "Siddharth Menon",
    title: "Boutique Hotelier · Assagao, Goa",
    piece: "Surya Woven Cane Beds (Suite Commission)",
  },
];

export const formatTimberPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
