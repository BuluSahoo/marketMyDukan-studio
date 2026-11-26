import type { TemplateMeta } from "@/types/template";
import { categories } from "./categories";

/**
 * Independent Template Registry.
 * Only fully implemented, self-contained templates under src/templates/<category>/<template>/
 * are registered here. The catalogue and /preview/[slug] route use this registry as the
 * single source of truth for preview availability.
 */
export const templates: readonly TemplateMeta[] = [
  {
    slug: "oakline-interiors",
    categorySlug: "furniture",
    name: "Oakline Interiors",
    tagline: "Premium contemporary furniture showroom with solid oak & warm cream editorial design.",
    tags: ["furniture", "e-commerce", "showroom", "editorial"],
    thumbnail: "/templates/oakline-interiors/hero-showroom.jpg",
    demoPath: "/preview/oakline-interiors",
  },
  {
    slug: "timber-and-loom",
    categorySlug: "furniture",
    name: "Timber & Loom",
    tagline: "Dark luxury furniture atelier pairing smoked timber with handwoven textiles & brass.",
    tags: ["furniture", "e-commerce", "dark luxury", "bespoke"],
    thumbnail: "/templates/timber-and-loom/hero-dark-lounge.jpg",
    demoPath: "/preview/timber-and-loom",
  },
];

export const getTemplatesByCategory = (categorySlug: string) =>
  templates.filter((t) => t.categorySlug === categorySlug);

export const getRegisteredTemplateBySlug = (slug: string) =>
  templates.find((t) => t.slug === slug);

export const isTemplateRegistered = (slug: string) =>
  templates.some((t) => t.slug === slug);

export const getCategoriesWithTemplates = () =>
  categories.map((category) => ({
    ...category,
    templates: getTemplatesByCategory(category.slug),
  }));
