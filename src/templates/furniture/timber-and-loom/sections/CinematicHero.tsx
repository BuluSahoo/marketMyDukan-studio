"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import styled from "styled-components";
import {
  TIMBER_CATEGORIES,
  formatTimberPrice,
  timberProducts,
  type TimberCategory,
  type TimberProduct,
} from "../data/timber-data";
import { timberMedia, timberTheme as t } from "../styles/theme";
import { TimberContainer } from "../components/TimberContainer";

const Wrapper = styled.section`
  position: relative;
  background: ${t.colors.bg};
`;

const Stage = styled.div`
  position: relative;
  min-height: 540px;
  display: flex;
  align-items: flex-end;
  padding: 4.5rem 0 3rem;
  overflow: hidden;

  ${timberMedia.tablet} {
    min-height: 620px;
    padding: 5.5rem 0 4rem;
  }

  ${timberMedia.desktop} {
    min-height: 700px;
    align-items: center;
    padding: 5rem 0;
  }
`;

const BgImage = styled.div`
  position: absolute;
  inset: 0;

  img {
    object-fit: cover;
    object-position: center;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(23, 24, 23, 0.92) 0%,
      rgba(23, 24, 23, 0.72) 48%,
      rgba(23, 24, 23, 0.28) 100%
    );
  }
`;

const Foreground = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  gap: 2.5rem;
  align-items: end;

  ${timberMedia.desktop} {
    grid-template-columns: 1.15fr 0.85fr;
    align-items: center;
  }
`;

const Copy = styled.div`
  max-width: 38rem;

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${t.colors.accent};
  }

  h1 {
    font-size: clamp(2.5rem, 8vw, 4.75rem);
    line-height: 1.02;
    color: ${t.colors.text};
  }

  h1 em {
    font-style: italic;
    color: ${t.colors.accent};
  }

  p.lead {
    max-width: 33rem;
    margin-top: 1.35rem;
    font-size: 1.0625rem;
    color: ${t.colors.muted};
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;

  ${timberMedia.tablet} {
    flex-direction: row;
  }
`;

const Primary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 50px;
  padding: 0 1.75rem;
  border-radius: ${t.radii.pill};
  background: ${t.colors.accent};
  color: ${t.colors.bg};
  font-weight: 700;
  font-size: 0.9375rem;
  transition: background ${t.transitions.base};

  &:hover {
    background: ${t.colors.accentHover};
  }
`;

const Secondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 1.75rem;
  border-radius: ${t.radii.pill};
  border: 1px solid ${t.colors.borderStrong};
  background: rgba(23, 24, 23, 0.55);
  color: ${t.colors.text};
  font-weight: 600;
  font-size: 0.9375rem;
  transition: border-color ${t.transitions.base};

  &:hover {
    border-color: ${t.colors.accent};
  }
`;

const HotspotCard = styled.button`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 21rem;
  padding: 1.25rem;
  border: 1px solid ${t.colors.borderStrong};
  border-radius: ${t.radii.md};
  background: rgba(34, 37, 34, 0.86);
  backdrop-filter: blur(12px);
  color: ${t.colors.text};
  text-align: left;
  transition: border-color ${t.transitions.base}, transform ${t.transitions.base};

  ${timberMedia.desktop} {
    justify-self: end;
  }

  &:hover {
    border-color: ${t.colors.accent};
    transform: translateY(-2px);
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${t.colors.accent};
  }

  strong {
    font-family: ${t.fonts.serif};
    font-size: 1.25rem;
    font-weight: 500;
  }

  span.meta {
    font-size: 0.8125rem;
    color: ${t.colors.muted};
  }

  span.cta {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.25rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: ${t.colors.text};
  }
`;

const CategoryStrip = styled.div`
  background: ${t.colors.bgSecondary};
  border-top: 1px solid ${t.colors.border};
  border-bottom: 1px solid ${t.colors.border};
`;

const StripRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.75rem 0;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${timberMedia.desktop} {
    justify-content: space-between;
  }

  button {
    flex-shrink: 0;
    min-height: 44px;
    padding: 0 1rem;
    border: 1px solid transparent;
    border-radius: ${t.radii.pill};
    background: transparent;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${t.colors.muted};
    white-space: nowrap;
    transition: all ${t.transitions.base};

    &:hover {
      color: ${t.colors.text};
      border-color: ${t.colors.borderStrong};
    }
  }
`;

interface Props {
  onSelectCategory: (cat: TimberCategory) => void;
  onInspectProduct: (product: TimberProduct) => void;
}

const heroFeature = timberProducts[1]; // Deccan Handloom Lounge Sofa shown in hero photo

export function CinematicHero({ onSelectCategory, onInspectProduct }: Props) {
  return (
    <Wrapper aria-labelledby="tl-hero-title">
      <Stage>
        <BgImage>
          <Image
            src="/templates/timber-and-loom/hero-dark-lounge.jpg"
            alt="Timber and Loom dark architectural showroom with smoked teak sofa and brass lamp"
            fill
            priority
            sizes="100vw"
          />
        </BgImage>

        <TimberContainer>
          <Foreground>
            <Copy>
              <span className="eyebrow">Dark Timber &amp; Handloom Atelier</span>
              <h1 id="tl-hero-title">
                Sculpted in Shadow, <em>Woven</em> for Dusk.
              </h1>
              <p className="lead">
                Heirloom furniture shaped from seasoned Burma teak, smoked walnut, and hand-spun
                natural wool — built for calm, moody contemporary spaces.
              </p>
              <Actions>
                <Primary href="#tl-bestsellers">
                  Shop Best Sellers <ArrowRight size={17} aria-hidden />
                </Primary>
                <Secondary href="#tl-collections">Explore Collections</Secondary>
              </Actions>
            </Copy>

            {heroFeature && (
              <HotspotCard
                type="button"
                onClick={() => onInspectProduct(heroFeature)}
                aria-label={`Inspect featured piece ${heroFeature.name}`}
              >
                <span className="tag">
                  <Sparkles size={13} aria-hidden /> Featured in Frame
                </span>
                <strong>{heroFeature.name}</strong>
                <span className="meta">
                  {heroFeature.materials} · {formatTimberPrice(heroFeature.price)}
                </span>
                <span className="cta">
                  Inspect Piece <ArrowRight size={14} aria-hidden />
                </span>
              </HotspotCard>
            )}
          </Foreground>
        </TimberContainer>
      </Stage>

      <CategoryStrip aria-label="Quick category jump">
        <TimberContainer>
          <StripRow>
            {TIMBER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </StripRow>
        </TimberContainer>
      </CategoryStrip>
    </Wrapper>
  );
}

