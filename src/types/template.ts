/** Data model for the template showcase and catalogue. One category -> many independent templates. */
export interface TemplateCategory {
  slug: string;
  name: string;
  /** Concise label used in filter navigation pills */
  shortName: string;
  description: string;
}

export const WEBSITE_TYPES = [
  "E-commerce",
  "Business",
  "Portfolio",
  "Landing Page",
] as const;

export type WebsiteType = (typeof WEBSITE_TYPES)[number];

export type TemplateSortOption = "featured" | "price-asc" | "price-desc";

export interface TemplateMeta {
  /** Unique, URL-safe id, e.g. "furniture-oak-studio" */
  slug: string;
  /** Must match a TemplateCategory.slug */
  categorySlug: string;
  name: string;
  tagline: string;
  tags: readonly string[];
  /** Path under /public, e.g. /templates/furniture-oak-studio/cover.jpg */
  thumbnail?: string;
  /** Route of the live demo, e.g. /demo/furniture/oak-studio */
  demoPath?: string;
}

/** Sample template shown on the agency homepage (UI-facing, separate from real template code). */
export interface ShowcaseTemplate {
  slug: string;
  name: string;
  categorySlug: string;
  /** e.g. "E-commerce Store" */
  websiteType: string;
  /** Starting price in INR */
  startingPrice: number;
  /** Desktop preview (4:3) */
  image: string;
  /** Mobile preview (9:19) */
  mobileImage: string;
  imageAlt: string;
  featured: boolean;
}

/** Centralized template catalogue metadata, kept separate from homepage showcase data and live template registry. */
export interface CatalogTemplate {
  slug: string;
  name: string;
  categorySlug: string;
  websiteType: WebsiteType;
  tagline: string;
  startingPrice: number;
  image: string;
  mobileImage: string;
  imageAlt: string;
  featured: boolean;
  keywords: readonly string[];
  highlights: readonly string[];
  /** True only when a real independent template exists in src/templates/registry.ts */
  previewAvailable: boolean;
  /** Route to live preview (e.g. /preview/oakline-interiors) when registered */
  previewPath?: string;
}
