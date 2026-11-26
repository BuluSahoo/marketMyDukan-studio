import type { TemplateCategory } from "@/types/template";

export const categories: readonly TemplateCategory[] = [
  {
    slug: "furniture",
    name: "Furniture",
    shortName: "Furniture",
    description: "Warm editorial showrooms, custom carpentry studios and home décor stores.",
  },
  {
    slug: "fashion",
    name: "Clothing & Fashion",
    shortName: "Clothing",
    description: "Lookbook-driven boutiques, apparel drops and lifestyle fashion storefronts.",
  },
  {
    slug: "electronics",
    name: "Electronics",
    shortName: "Electronics",
    description: "High-contrast gadget stores, tech retailers and certified repair centres.",
  },
  {
    slug: "healthcare",
    name: "Doctor & Healthcare",
    shortName: "Clinic",
    description: "Trustworthy clinic websites with doctor profiles and appointment booking.",
  },
  {
    slug: "restaurant",
    name: "Restaurant & Cafe",
    shortName: "Restaurant",
    description: "Appetising menus, online ordering flows and table reservation websites.",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    shortName: "Real Estate",
    description: "Property listing portals, residential project launches and brokerage sites.",
  },
  {
    slug: "salon",
    name: "Salon & Beauty",
    shortName: "Salon",
    description: "Serene salon, spa and bridal artistry websites with effortless visit booking.",
  },
  {
    slug: "construction",
    name: "Construction",
    shortName: "Construction",
    description: "Project-focused websites for builders, civil contractors and architecture firms.",
  },
  {
    slug: "travel",
    name: "Travel & Tourism",
    shortName: "Travel",
    description: "Itinerary showcases, curated holiday packages and boutique retreat websites.",
  },
  {
    slug: "business",
    name: "Portfolio & Business",
    shortName: "Portfolio & Business",
    description: "Polished digital homes for studios, consultants, agencies and growing companies.",
  },
];

export const getCategoryBySlug = (slug: string): TemplateCategory | undefined =>
  categories.find((c) => c.slug === slug);
