import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { TemplateCatalogue } from "@/components/catalogue/TemplateCatalogue";
import { categories } from "@/templates/categories";
import { getCatalogTemplates, getCatalogTemplatesByCategory } from "@/data/template-catalog";

export const metadata: Metadata = {
  title: "Website Templates",
  description:
    "Explore professionally designed website templates across 10 business categories by MarketMyDukan Studio.",
};

export default function TemplatesPage() {
  const templates = getCatalogTemplates();
  const categoryCounts = Object.fromEntries(
    categories.map((cat) => [cat.slug, getCatalogTemplatesByCategory(cat.slug).length]),
  );

  return (
    <PageShell>
      <TemplateCatalogue
        templates={templates}
        categoryCounts={categoryCounts}
        totalCount={templates.length}
      />
    </PageShell>
  );
}

