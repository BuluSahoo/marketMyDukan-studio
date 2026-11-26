"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Monitor, Smartphone, X } from "lucide-react";
import styled, { css } from "styled-components";
import { media } from "@/styles/theme";
import { ButtonLink } from "@/components/ui/Button";
import { formatPrice } from "@/data/template-catalog";
import { getCategoryBySlug } from "@/templates/categories";
import type { CatalogTemplate } from "@/types/template";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(23, 23, 23, 0.56);
  backdrop-filter: blur(6px);
  overflow-y: auto;
`;

const Dialog = styled.div`
  position: relative;
  width: 100%;
  max-width: 920px;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 24px 64px rgba(23, 23, 23, 0.24);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }
`;

const Layout = styled.div`
  display: grid;
  ${media.desktop} {
    grid-template-columns: 1.15fr 1fr;
  }
`;

const PreviewPane = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${media.desktop} {
    border-bottom: 0;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    padding: 2rem;
  }
`;

const Frame = styled.div<{ $mobile: boolean }>`
  position: relative;
  margin-inline: auto;
  width: ${({ $mobile }) => ($mobile ? "210px" : "100%")};
  aspect-ratio: ${({ $mobile }) => ($mobile ? "9 / 18" : "4 / 3")};
  border-radius: ${({ $mobile, theme }) => ($mobile ? "22px" : theme.radii.md)};
  border: ${({ $mobile, theme }) => ($mobile ? `5px solid ${theme.colors.text}` : `1px solid ${theme.colors.border}`)};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.card};

  img {
    object-fit: cover;
    object-position: top;
  }
`;

const Switcher = styled.div`
  display: inline-flex;
  align-self: center;
  gap: 0.375rem;
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tab = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 40px;
  padding: 0 0.9rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.8125rem;
  font-weight: 600;
  ${({ $active, theme }) =>
    $active
      ? css`
          background: ${theme.colors.text};
          color: ${theme.colors.card};
        `
      : css`
          background: transparent;
          color: ${theme.colors.muted};
        `}
`;

const InfoPane = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  ${media.desktop} {
    padding: 2rem;
  }

  h2 {
    font-size: 1.625rem;
    padding-right: 2.5rem;
  }
`;

const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const Pill = styled.span`
  padding: 0.25rem 0.7rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(231, 163, 62, 0.16);
  font-size: 0.75rem;
  font-weight: 600;
`;

const TypeBadge = styled.span`
  padding: 0.25rem 0.7rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.75rem;
  font-weight: 500;
`;

const Tagline = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const Highlights = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.9375rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  svg {
    color: ${({ theme }) => theme.colors.accent};
    flex-shrink: 0;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.5rem;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};

  span {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.muted};
  }
  strong {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.375rem;
  }
`;

interface Props {
  template: CatalogTemplate | null;
  onClose: () => void;
}

export function TemplateQuickViewModal({ template, onClose }: Props) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    if (!template) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [template, onClose]);

  if (!template) return null;

  const categoryName = getCategoryBySlug(template.categorySlug)?.name ?? template.categorySlug;

  return (
    <Backdrop onClick={onClose} role="presentation">
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseBtn type="button" aria-label="Close template details" onClick={onClose}>
          <X size={20} aria-hidden />
        </CloseBtn>
        <Layout>
          <PreviewPane>
            <Frame $mobile={device === "mobile"}>
              <Image
                src={device === "mobile" ? template.mobileImage : template.image}
                alt={template.imageAlt}
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
              />
            </Frame>
            <Switcher role="group" aria-label="Preview viewport">
              <Tab
                type="button"
                $active={device === "desktop"}
                aria-pressed={device === "desktop"}
                onClick={() => setDevice("desktop")}
              >
                <Monitor size={15} aria-hidden /> Desktop
              </Tab>
              <Tab
                type="button"
                $active={device === "mobile"}
                aria-pressed={device === "mobile"}
                onClick={() => setDevice("mobile")}
              >
                <Smartphone size={15} aria-hidden /> Mobile
              </Tab>
            </Switcher>
          </PreviewPane>

          <InfoPane>
            <h2 id="quick-view-title">{template.name}</h2>
            <Badges>
              <Pill>{categoryName}</Pill>
              <TypeBadge>{template.websiteType}</TypeBadge>
            </Badges>
            <Tagline>{template.tagline}</Tagline>
            <Highlights>
              {template.highlights.map((h) => (
                <li key={h}>
                  <Check size={16} aria-hidden /> {h}
                </li>
              ))}
            </Highlights>
            <Bottom>
              <PriceRow>
                <span>Starting price (customised for you)</span>
                <strong>{formatPrice(template.startingPrice)}</strong>
              </PriceRow>
              <ButtonLink
                href={template.previewAvailable && template.previewPath ? template.previewPath : "/#contact"}
                block
                onClick={onClose}
              >
                {template.previewAvailable && template.previewPath
                  ? "Launch Live Preview"
                  : "Request This Design"}{" "}
                <ArrowRight size={18} aria-hidden />
              </ButtonLink>
            </Bottom>
          </InfoPane>
        </Layout>
      </Dialog>
    </Backdrop>
  );
}
