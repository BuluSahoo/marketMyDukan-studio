"use client";

import Link from "next/link";
import styled, { css } from "styled-components";
import { media } from "@/styles/theme";
import type { TemplateCategory } from "@/types/template";

const Nav = styled.nav`
  width: 100%;
  min-width: 0;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.desktop} {
    flex-wrap: wrap;
    overflow-x: visible;
    padding-bottom: 0;
  }

  li {
    flex-shrink: 0;
  }
`;

const Pill = styled(Link)<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 44px;
  padding: 0 1rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid;
  transition:
    background ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};

  ${({ $active, theme }) =>
    $active
      ? css`
          background: ${theme.colors.text};
          color: ${theme.colors.card};
          border-color: ${theme.colors.text};
        `
      : css`
          background: ${theme.colors.card};
          color: ${theme.colors.text};
          border-color: ${theme.colors.border};
          &:hover {
            border-color: ${theme.colors.text};
          }
        `}
`;

const Count = styled.span<{ $active: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.muted)};
`;

interface Props {
  categories: readonly TemplateCategory[];
  activeSlug?: string;
  counts?: Record<string, number>;
  totalCount?: number;
}

export function CategoryFilter({ categories, activeSlug, counts, totalCount }: Props) {
  const isAll = !activeSlug;

  return (
    <Nav aria-label="Template categories">
      <List>
        <li>
          <Pill href="/templates" $active={isAll} aria-current={isAll ? "page" : undefined}>
            All
            {typeof totalCount === "number" && <Count $active={isAll}>{totalCount}</Count>}
          </Pill>
        </li>
        {categories.map((cat) => {
          const active = activeSlug === cat.slug;
          const count = counts?.[cat.slug];
          return (
            <li key={cat.slug}>
              <Pill
                href={`/templates/${cat.slug}`}
                $active={active}
                aria-current={active ? "page" : undefined}
              >
                {cat.shortName}
                {typeof count === "number" && <Count $active={active}>{count}</Count>}
              </Pill>
            </li>
          );
        })}
      </List>
    </Nav>
  );
}

