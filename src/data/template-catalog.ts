import type { CatalogTemplate, TemplateSortOption, WebsiteType } from "@/types/template";
import { getCategoryBySlug } from "@/templates/categories";
import { getRegisteredTemplateBySlug, isTemplateRegistered } from "@/templates/registry";

const item = (
  slug: string,
  name: string,
  categorySlug: string,
  websiteType: WebsiteType,
  startingPrice: number,
  featured: boolean,
  tagline: string,
  keywords: readonly string[],
  highlights: readonly string[],
): CatalogTemplate => {
  const registered = getRegisteredTemplateBySlug(slug);
  return {
    slug,
    name,
    categorySlug,
    websiteType,
    tagline,
    startingPrice,
    featured,
    image: `/previews/${slug}.svg`,
    mobileImage: `/previews/${slug}-mobile.svg`,
    imageAlt: `${name} — ${tagline}`,
    keywords,
    highlights,
    previewAvailable: isTemplateRegistered(slug),
    previewPath: registered?.demoPath,
  };
};

/**
 * Centralized template catalogue metadata.
 * Multiple templates per category are supported cleanly; adding entries here
 * automatically populates /templates and /templates/[category].
 */
export const catalogTemplates: readonly CatalogTemplate[] = [
  item(
    "oakline-interiors",
    "Oakline Interiors",
    "furniture",
    "E-commerce",
    12999,
    true,
    "Editorial furniture storefront with room collections and product filtering",
    ["furniture", "sofa", "home decor", "interior", "showroom", "store"],
    ["Collection & room filters", "Product detail & variant layout", "WhatsApp enquiry & cart"],
  ),
  item(
    "timber-and-loom",
    "Timber & Loom",
    "furniture",
    "E-commerce",
    14499,
    false,
    "Dark luxury furniture atelier pairing smoked timber, handloom upholstery and bronze",
    ["carpentry", "bespoke", "wood", "custom furniture", "dark luxury", "teak"],
    ["Dark editorial storefront", "Finish & textile selector", "Cart drawer & WhatsApp enquiry"],
  ),
  item(
    "maison-vela",
    "Maison Vela",
    "fashion",
    "E-commerce",
    9999,
    true,
    "Minimalist clothing boutique built around seasonal lookbooks",
    ["clothing", "fashion", "boutique", "apparel", "dress", "wear"],
    ["Lookbook & collection grid", "Size guide & quick view", "Mobile-first checkout"],
  ),
  item(
    "kora-streetwear",
    "Kora Streetwear",
    "fashion",
    "Landing Page",
    8499,
    false,
    "Bold drop-focused landing page for contemporary streetwear labels",
    ["streetwear", "apparel", "drop", "clothing", "urban", "brand"],
    ["Drop countdown & waitlist", "Editorial campaign gallery", "Instagram feed integration"],
  ),
  item(
    "voltix-electronics",
    "Voltix",
    "electronics",
    "E-commerce",
    11999,
    true,
    "Sleek dark-mode electronics store for gadgets, audio and smart devices",
    ["electronics", "gadgets", "tech", "audio", "devices", "appliances"],
    ["Spec comparison cards", "Category & brand filters", "Warranty & support highlights"],
  ),
  item(
    "circuit-repair-hub",
    "Circuit Care",
    "electronics",
    "Business",
    7999,
    false,
    "Trust-first website for phone, laptop and appliance repair centres",
    ["repair", "electronics", "laptop", "mobile", "service", "technician"],
    ["Device issue estimator", "Same-day pickup booking", "Service warranty badge grid"],
  ),
  item(
    "carefirst-clinic",
    "CareFirst Clinic",
    "healthcare",
    "Business",
    8499,
    true,
    "Calm, reassuring clinic website with doctor profiles and appointment slots",
    ["doctor", "clinic", "hospital", "healthcare", "medical", "appointment"],
    ["Doctor & department cards", "Online appointment request", "Clinic timings & directions"],
  ),
  item(
    "vedacare-dental",
    "VedaCare Dental",
    "healthcare",
    "Landing Page",
    7499,
    false,
    "Conversion-focused dental & wellness clinic landing page",
    ["dental", "dentist", "clinic", "healthcare", "smile", "checkup"],
    ["Treatment overview cards", "Patient testimonials", "One-tap WhatsApp booking"],
  ),
  item(
    "saffron-and-co",
    "Saffron & Co.",
    "restaurant",
    "Business",
    8999,
    true,
    "Warm hospitality website with digital menu and table reservation flow",
    ["restaurant", "dining", "food", "menu", "table", "cafe"],
    ["Categorised digital menu", "Table booking request", "Chef specials & location map"],
  ),
  item(
    "roast-and-crumb",
    "Roast & Crumb",
    "restaurant",
    "E-commerce",
    10499,
    false,
    "Artisan bakery & coffee roastery storefront for direct local orders",
    ["cafe", "bakery", "coffee", "pastry", "restaurant", "ordering"],
    ["Fresh menu & bean store", "Scheduled pickup slots", "Subscription bundle cards"],
  ),
  item(
    "prime-nest-realty",
    "Prime Nest",
    "real-estate",
    "Business",
    14999,
    true,
    "Modern real estate agency website with curated property listings",
    ["real estate", "property", "apartments", "homes", "broker", "listings"],
    ["Filterable property listings", "Floor plan & amenity cards", "Site-visit inquiry form"],
  ),
  item(
    "skyline-residences",
    "Skyline Residences",
    "real-estate",
    "Landing Page",
    9999,
    false,
    "Single-project launch page for luxury villas and residential towers",
    ["real estate", "villas", "project", "developer", "luxury", "launch"],
    ["Project masterplan highlights", "Brochure download CTA", "Virtual tour showcase"],
  ),
  item(
    "glow-atelier",
    "Glow Atelier",
    "salon",
    "Business",
    7499,
    false,
    "Refined salon and skincare studio site with transparent service menu",
    ["salon", "beauty", "spa", "skincare", "hair", "booking"],
    ["Service & pricing menu", "Stylist showcase", "Instant appointment CTA"],
  ),
  item(
    "velvet-lash-studio",
    "Velvet Studio",
    "salon",
    "Portfolio",
    6999,
    false,
    "Visual portfolio for bridal makeup artists and independent stylists",
    ["makeup", "bridal", "beauty", "salon", "portfolio", "artist"],
    ["Before/after look gallery", "Bridal package tiers", "Direct booking inquiry"],
  ),
  item(
    "ironbuild-construction",
    "Ironbuild Co.",
    "construction",
    "Business",
    9499,
    false,
    "Dependable corporate presence for civil contractors and builders",
    ["construction", "builder", "contractor", "civil", "engineering", "projects"],
    ["Completed project showcase", "Service capabilities grid", "Quote request workflow"],
  ),
  item(
    "arcline-architects",
    "Arcline Builders",
    "construction",
    "Portfolio",
    11499,
    false,
    "Architectural portfolio for turnkey residential and commercial builders",
    ["architecture", "construction", "design", "portfolio", "turnkey", "residential"],
    ["Case-study project cards", "Material & process breakdown", "Consultation scheduler"],
  ),
  item(
    "wanderlane-travel",
    "Wanderlane",
    "travel",
    "E-commerce",
    10999,
    true,
    "Vibrant tour & package storefront for travel agencies and operators",
    ["travel", "tourism", "tours", "holiday", "packages", "trips"],
    ["Itinerary & package cards", "Destination highlights", "Group & custom trip inquiry"],
  ),
  item(
    "summit-retreats",
    "Summit Retreats",
    "travel",
    "Landing Page",
    8499,
    false,
    "Atmospheric landing page for boutique stays, resorts and eco-retreats",
    ["resort", "retreat", "stays", "travel", "tourism", "getaway"],
    ["Room & cabin preview", "Seasonal experience guide", "Direct stay reservation CTA"],
  ),
  item(
    "northfield-studio",
    "Northfield Studio",
    "business",
    "Portfolio",
    6999,
    false,
    "Clean, spacious portfolio template for creative studios and independents",
    ["portfolio", "studio", "creative", "agency", "design", "freelance"],
    ["Selected work grid", "Case study highlights", "Minimal contact drawer"],
  ),
  item(
    "apex-advisory",
    "Apex Advisory",
    "business",
    "Business",
    9999,
    false,
    "Credible corporate website for consultants, accountants and B2B firms",
    ["business", "consulting", "advisory", "corporate", "finance", "firm"],
    ["Practice area breakdown", "Leadership & credentials", "Discovery call booking"],
  ),
];

export const getCatalogTemplates = () => catalogTemplates;

export const getCatalogTemplatesByCategory = (categorySlug: string) =>
  catalogTemplates.filter((t) => t.categorySlug === categorySlug);

export const getCatalogTemplateWithRegistry = (slug: string) => {
  const template = catalogTemplates.find((t) => t.slug === slug);
  if (!template) return undefined;
  const registered = getRegisteredTemplateBySlug(slug);
  return { ...template, demoPath: registered?.demoPath };
};

export interface TemplateFilterOptions {
  categorySlug?: string;
  query?: string;
  websiteType?: WebsiteType | "All";
  sort?: TemplateSortOption;
}

export function filterAndSortTemplates(
  source: readonly CatalogTemplate[],
  { categorySlug, query = "", websiteType = "All", sort = "featured" }: TemplateFilterOptions,
): CatalogTemplate[] {
  const q = query.trim().toLowerCase();

  const filtered = source.filter((tpl) => {
    if (categorySlug && tpl.categorySlug !== categorySlug) return false;
    if (websiteType !== "All" && tpl.websiteType !== websiteType) return false;
    if (!q) return true;

    const categoryName = getCategoryBySlug(tpl.categorySlug)?.name ?? "";
    const haystack = [
      tpl.name,
      tpl.tagline,
      tpl.websiteType,
      tpl.categorySlug,
      categoryName,
      ...tpl.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });

  const sorted = [...filtered];
  if (sort === "price-asc") {
    sorted.sort((a, b) => a.startingPrice - b.startingPrice);
  } else if (sort === "price-desc") {
    sorted.sort((a, b) => b.startingPrice - a.startingPrice);
  } else {
    sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  return sorted;
}

export const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
