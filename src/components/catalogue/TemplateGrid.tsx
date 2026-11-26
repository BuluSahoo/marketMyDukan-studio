"use client";

import styled from "styled-components";
import { media } from "@/styles/theme";
import { TemplateCard } from "@/components/ui/TemplateCard";
import { getCategoryBySlug } from "@/templates/categories";
import type { CatalogTemplate } from "@/types/template";

const Grid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.25rem;

  ${media.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  ${media.desktop} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  li {
    min-width: 0;
  }
`;

interface Props {
  templates: readonly CatalogTemplate[];
  onSelectTemplate: (template: CatalogTemplate) => void;
}

export function TemplateGrid({ templates, onSelectTemplate }: Props) {
  return (
    <Grid>
      {templates.map((template, i) => {
        const categoryName = getCategoryBySlug(template.categorySlug)?.name ?? template.categorySlug;
        return (
          <li key={template.slug}>
            <TemplateCard
              template={template}
              categoryName={categoryName}
              priority={i < 3}
              ctaLabel="View Details"
              showPreviewStatus
              onAction={() => onSelectTemplate(template)}
            />
          </li>
        );
      })}
    </Grid>
  );
}

