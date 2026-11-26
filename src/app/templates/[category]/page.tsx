import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { TemplateCatalogue } from "@/components/catalogue/TemplateCatalogue";
import { categories, getCategoryBySlug } from "@/templates/categories";
import { getCatalogTemplates, getCatalogTemplatesByCategory } from "@/data/template-catalog";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return { title: "Category Not Found" };
  }
  return {
    title: `${category.name} Website Templates`,
    description: category.description,
  };
}

export default async function CategoryTemplatesPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allTemplates = getCatalogTemplates();
  const categoryTemplates = getCatalogTemplatesByCategory(category.slug);
  const categoryCounts = Object.fromEntries(
    categories.map((cat) => [cat.slug, getCatalogTemplatesByCategory(cat.slug).length]),
  );

  return (
    <PageShell>
      <TemplateCatalogue
        templates={categoryTemplates}
        activeCategory={category}
        categoryCounts={categoryCounts}
        totalCount={allTemplates.length}
      />
    </PageShell>
  );
}

