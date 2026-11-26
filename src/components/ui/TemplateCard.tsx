"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Eye } from "lucide-react";
import styled from "styled-components";
import { Button, ButtonLink } from "./Button";
import { formatPrice } from "@/data/template-catalog";

export interface TemplateCardItem {
  slug: string;
  name: string;
  categorySlug: string;
  websiteType: string;
  startingPrice: number;
  image: string;
  imageAlt: string;
  tagline?: string;
  previewAvailable?: boolean;
  previewPath?: string;
}

const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: transform ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;

  img {
    object-fit: cover;
    object-position: top;
    transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  ${Card}:hover & img { transform: scale(1.03); }
`;

const MediaLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
`;

const StatusBadge = styled.span<{ $live: boolean }>`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.65rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $live, theme }) => ($live ? theme.colors.text : "rgba(255, 255, 255, 0.92)")};
  color: ${({ $live, theme }) => ($live ? theme.colors.card : theme.colors.muted)};
  border: 1px solid ${({ $live, theme }) => ($live ? theme.colors.text : theme.colors.border)};
  font-size: 0.75rem;
  font-weight: 600;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ $live }) => ($live ? "#22C55E" : "#B0ABA0")};
  }
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.25rem;
  gap: 0.875rem;

  h3 { font-size: 1.25rem; }
`;

const Tagline = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.625rem;
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const Pill = styled.span`
  padding: 0.2rem 0.65rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(231, 163, 62, 0.16);
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  font-weight: 600;
`;

const TypeBadge = styled.span`
  padding: 0.2rem 0.6rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  font-weight: 500;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Price = styled.p`
  small {
    display: block;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.muted};
  }
  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.25rem;
    letter-spacing: -0.02em;
  }
`;

interface Props {
  template: TemplateCardItem;
  categoryName: string;
  priority?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  onAction?: () => void;
  showPreviewStatus?: boolean;
}

export function TemplateCard({
  template,
  categoryName,
  priority,
  ctaLabel = "Preview",
  ctaHref = "/#contact",
  onAction,
  showPreviewStatus = false,
}: Props) {
  const hasLivePreview = Boolean(template.previewAvailable && template.previewPath);

  const mediaImage = (
    <Image
      src={template.image}
      alt={template.imageAlt}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 380px, (min-width: 768px) 46vw, 92vw"
    />
  );

  return (
    <Card>
      <Media>
        {hasLivePreview && template.previewPath ? (
          <MediaLink href={template.previewPath} aria-label={`Open live preview of ${template.name}`}>
            {mediaImage}
          </MediaLink>
        ) : (
          mediaImage
        )}
        {showPreviewStatus && (
          <StatusBadge $live={hasLivePreview}>
            {hasLivePreview ? "Live Preview" : "Design Concept"}
          </StatusBadge>
        )}
      </Media>
      <Body>
        <div>
          <h3>{template.name}</h3>
          <Meta>
            <Pill>{categoryName}</Pill>
            <TypeBadge>{template.websiteType}</TypeBadge>
          </Meta>
          {template.tagline && <Tagline>{template.tagline}</Tagline>}
        </div>
        <Footer>
          <Price>
            <small>Starting at</small>
            <strong>{formatPrice(template.startingPrice)}</strong>
          </Price>
          {hasLivePreview && template.previewPath ? (
            <ButtonLink
              href={template.previewPath}
              variant="primary"
              ariaLabel={`Live preview ${template.name}`}
            >
              <Eye size={16} aria-hidden /> Live Preview
            </ButtonLink>
          ) : onAction ? (
            <Button
              variant="secondary"
              onClick={onAction}
              ariaLabel={`${ctaLabel} for ${template.name}`}
            >
              {ctaLabel} <ArrowUpRight size={16} aria-hidden />
            </Button>
          ) : (
            <ButtonLink
              href={ctaHref}
              variant="secondary"
              ariaLabel={`${ctaLabel} ${template.name}`}
            >
              <Eye size={16} aria-hidden /> {ctaLabel}
            </ButtonLink>
          )}
        </Footer>
      </Body>
    </Card>
  );
}
