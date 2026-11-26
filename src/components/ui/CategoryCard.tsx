"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styled from "styled-components";
import { media } from "@/styles/theme";
import { categoryIcons } from "@/data/category-icons";
import type { ShowcaseTemplate, TemplateCategory } from "@/types/template";

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    border-color: ${({ theme }) => theme.colors.accent};
  }
  &:active { transform: translateY(-1px); }
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;

  img {
    object-fit: cover;
    object-position: top;
    transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  ${Card}:hover & img { transform: scale(1.04); }
`;

const Badge = styled.span`
  position: absolute;
  left: 0.625rem;
  bottom: 0.625rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.875rem 0.875rem 1rem;
  ${media.tablet} { padding: 1rem 1.125rem 1.125rem; }

  h3 {
    font-size: 0.9375rem;
    line-height: 1.25;
    ${media.tablet} { font-size: 1rem; }
  }
  span {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.colors.muted};
  }
  svg { flex-shrink: 0; color: ${({ theme }) => theme.colors.muted}; }
  ${Card}:hover & svg { color: ${({ theme }) => theme.colors.accent}; }
`;

interface Props {
  category: TemplateCategory;
  cover: ShowcaseTemplate;
  count: number;
}

export function CategoryCard({ category, cover, count }: Props) {
  const Icon = categoryIcons[category.slug];
  return (
    <Card
      href={`/templates/${category.slug}`}
      aria-label={`${category.name} — ${count} website ${count === 1 ? "design" : "designs"}`}
    >
      <Media>
        <Image
          src={cover.image}
          alt={cover.imageAlt}
          fill
          sizes="(min-width: 1024px) 220px, (min-width: 768px) 340px, 50vw"
        />
        {Icon && (
          <Badge aria-hidden>
            <Icon size={18} />
          </Badge>
        )}
      </Media>
      <Body>
        <div>
          <h3>{category.name}</h3>
          <span>
            {count} {count === 1 ? "design" : "designs"}
          </span>
        </div>
        <ArrowUpRight size={18} aria-hidden />
      </Body>
    </Card>
  );
}

