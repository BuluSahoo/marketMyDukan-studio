import type { ShowcaseTemplate } from "@/types/template";

const make = (
  slug: string,
  name: string,
  categorySlug: string,
  websiteType: string,
  startingPrice: number,
  featured: boolean,
  description: string,
): ShowcaseTemplate => ({
  slug,
  name,
  categorySlug,
  websiteType,
  startingPrice,
  featured,
  image: `/previews/${slug}.svg`,
  mobileImage: `/previews/${slug}-mobile.svg`,
  imageAlt: `${name} website design preview — ${description}`,
});

export const showcaseTemplates: readonly ShowcaseTemplate[] = [
  make("oakline-interiors", "Oakline Interiors", "furniture", "E-commerce Store", 12999, true, "furniture store with product collections"),
  make("maison-vela", "Maison Vela", "fashion", "Fashion Boutique", 9999, true, "fashion boutique with new arrivals"),
  make("voltix-electronics", "Voltix", "electronics", "Electronics Store", 11999, true, "dark electronics store with device showcase"),
  make("carefirst-clinic", "CareFirst Clinic", "healthcare", "Clinic & Appointments", 8499, true, "healthcare clinic with appointment booking"),
  make("saffron-and-co", "Saffron & Co.", "restaurant", "Restaurant & Menu", 8999, true, "restaurant with menu and table reservations"),
  make("wanderlane-travel", "Wanderlane", "travel", "Tours & Packages", 10999, true, "travel agency with tour packages"),
  make("prime-nest-realty", "Prime Nest", "real-estate", "Property Listings", 14999, false, "real estate agency with property listings"),
  make("glow-atelier", "Glow Atelier", "salon", "Salon & Bookings", 7499, false, "beauty salon with online bookings"),
  make("ironbuild-construction", "Ironbuild Co.", "construction", "Construction Company", 9499, false, "construction company with project gallery"),
  make("northfield-studio", "Northfield Studio", "business", "Portfolio & Corporate", 6999, false, "portfolio and corporate website"),
];

export const getFeaturedTemplates = () => showcaseTemplates.filter((t) => t.featured);

export const getTemplatesForCategory = (categorySlug: string) =>
  showcaseTemplates.filter((t) => t.categorySlug === categorySlug);

export const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

