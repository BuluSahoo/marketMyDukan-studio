import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRegisteredTemplateBySlug, templates } from "@/templates/registry";
import { PreviewRenderer } from "@/templates/preview-map";

interface PreviewPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PreviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getRegisteredTemplateBySlug(slug);
  if (!meta) {
    return { title: "Preview Not Found" };
  }
  return {
    title: `${meta.name} — Live Preview`,
    description: meta.tagline,
  };
}

export default async function TemplatePreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;
  const meta = getRegisteredTemplateBySlug(slug);

  if (!meta) {
    notFound();
  }

  return <PreviewRenderer slug={slug} />;
}
