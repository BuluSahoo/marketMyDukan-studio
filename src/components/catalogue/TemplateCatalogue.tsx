"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import styled from "styled-components";
import { media } from "@/styles/theme";
import { Container } from "@/components/ui/Container";
import { categories } from "@/templates/categories";
import { filterAndSortTemplates } from "@/data/template-catalog";
import type { CatalogTemplate, TemplateCategory, TemplateSortOption } from "@/types/template";
import { TemplateSearch } from "./TemplateSearch";
import { CategoryFilter } from "./CategoryFilter";
import { TemplateTypeFilter, type TypeFilterValue } from "./TemplateTypeFilter";
import { TemplateSort } from "./TemplateSort";
import { TemplateGrid } from "./TemplateGrid";
import { EmptyState } from "./EmptyState";
import { TemplateQuickViewModal } from "./TemplateQuickViewModal";

const HeaderBlock = styled.section`
  padding: 2.5rem 0 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};

  ${media.tablet} {
    padding: 3.5rem 0 2.5rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 44px;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};
  transition: color ${({ theme }) => theme.transitions.base};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Eyebrow = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.875rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};

  &::before {
    content: "";
    width: 24px;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${media.desktop} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  h1 {
    font-size: clamp(2rem, 6vw, 3.25rem);
  }

  p.lead {
    max-width: 44rem;
    margin-top: 0.75rem;
    font-size: 1.0625rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const CountBadge = styled.span`
  display: inline-flex;
  align-self: flex-start;
  padding: 0.4rem 0.9rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;

  ${media.desktop} {
    align-self: auto;
  }
`;

const CatalogueSection = styled.section`
  padding: 2rem 0 4.5rem;
  ${media.tablet} {
    padding: 2.5rem 0 6rem;
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.75rem;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${media.tablet} {
    flex-direction: row;
    align-items: center;
  }
`;

const FilterRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.25rem;

  ${media.desktop} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const StatusRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const ResetLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 44px;
  padding: 0 0.75rem;
  border: 0;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: background ${({ theme }) => theme.transitions.base};

  &:hover {
    background: rgba(231, 163, 62, 0.16);
  }
`;

interface Props {
  templates: readonly CatalogTemplate[];
  activeCategory?: TemplateCategory;
  categoryCounts: Record<string, number>;
  totalCount: number;
}

export function TemplateCatalogue({
  templates,
  activeCategory,
  categoryCounts,
  totalCount,
}: Props) {
  const [query, setQuery] = useState("");
  const [websiteType, setWebsiteType] = useState<TypeFilterValue>("All");
  const [sort, setSort] = useState<TemplateSortOption>("featured");
  const [selectedTemplate, setSelectedTemplate] = useState<CatalogTemplate | null>(null);

  const filtered = useMemo(
    () =>
      filterAndSortTemplates(templates, {
        categorySlug: activeCategory?.slug,
        query,
        websiteType,
        sort,
      }),
    [templates, activeCategory?.slug, query, websiteType, sort],
  );

  const hasActiveFilters = query.trim().length > 0 || websiteType !== "All" || sort !== "featured";

  const resetFilters = () => {
    setQuery("");
    setWebsiteType("All");
    setSort("featured");
  };

  return (
    <>
      <HeaderBlock>
        <Container>
          {activeCategory ? (
            <BackLink href="/templates">
              <ArrowLeft size={16} aria-hidden /> All Website Templates
            </BackLink>
          ) : null}
          <Eyebrow>{activeCategory ? "Category templates" : "Template catalogue"}</Eyebrow>
          <TitleRow>
            <div>
              <h1>{activeCategory ? activeCategory.name : "Explore Website Templates"}</h1>
              <p className="lead">
                {activeCategory
                  ? activeCategory.description
                  : "Find the perfect website design for your business."}
              </p>
            </div>
            <CountBadge>
              {templates.length} {templates.length === 1 ? "template" : "templates"} available
            </CountBadge>
          </TitleRow>
        </Container>
      </HeaderBlock>

      <CatalogueSection aria-label="Template catalogue filters and results">
        <Container>
          <Controls>
            <TopBar>
              <TemplateSearch value={query} onChange={setQuery} />
              <TemplateSort value={sort} onChange={setSort} />
            </TopBar>

            <CategoryFilter
              categories={categories}
              activeSlug={activeCategory?.slug}
              counts={categoryCounts}
              totalCount={totalCount}
            />

            <FilterRow>
              <TemplateTypeFilter value={websiteType} onChange={setWebsiteType} />
            </FilterRow>
          </Controls>

          <StatusRow>
            <span>
              Showing <strong>{filtered.length}</strong> of {templates.length}{" "}
              {templates.length === 1 ? "template" : "templates"}
              {activeCategory ? ` in ${activeCategory.name}` : ""}
            </span>
            {hasActiveFilters && (
              <ResetLink type="button" onClick={resetFilters}>
                <RotateCcw size={15} aria-hidden /> Reset filters
              </ResetLink>
            )}
          </StatusRow>

          {filtered.length > 0 ? (
            <TemplateGrid templates={filtered} onSelectTemplate={setSelectedTemplate} />
          ) : (
            <EmptyState
              onReset={resetFilters}
              showBrowseAll={Boolean(activeCategory)}
            />
          )}
        </Container>
      </CatalogueSection>

      <TemplateQuickViewModal
        key={selectedTemplate?.slug ?? "closed"}
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />
    </>
  );
}
