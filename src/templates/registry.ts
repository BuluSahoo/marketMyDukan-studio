import type { TemplateMeta } from "@/types/template";
import { categories } from "./categories";

/**
 * Independent Template Registry.
 * Live, self-contained demo templates under src/templates/<category>/<template>/
 * are registered here once implemented. Kept separate from homepage showcase data
 * and catalogue marketing metadata.
 */
export const templates: readonly TemplateMeta[] = [];

export const getTemplatesByCategory = (categorySlug: string) =>
  templates.filter((t) => t.categorySlug === categorySlug);

export const getRegisteredTemplateBySlug = (slug: string) =>
  templates.find((t) => t.slug === slug);

export const getCategoriesWithTemplates = () =>
  categories.map((category) => ({
    ...category,
    templates: getTemplatesByCategory(category.slug),
  }));
