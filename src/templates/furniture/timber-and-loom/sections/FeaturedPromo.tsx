"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import styled, { css } from "styled-components";
import { formatTimberPrice, timberProducts, type TimberProduct } from "../data/timber-data";
import { timberMedia, timberTheme as t } from "../styles/theme";
import { TimberContainer } from "../components/TimberContainer";

const Section = styled.section`
  padding: 2rem 0 4.5rem;
  scroll-margin-top: ${t.layout.headerHeight};
`;

const Panel = styled.div`
  display: grid;
  overflow: hidden;
  background: ${t.colors.card};
  border: 1px solid ${t.colors.borderStrong};
  border-radius: ${t.radii.lg};

  ${timberMedia.desktop} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  background: ${t.colors.bg};

  ${timberMedia.desktop} {
    aspect-ratio: auto;
    min-height: 460px;
  }

  img {
    object-fit: cover;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 1.5rem;

  ${timberMedia.tablet} {
    padding: 3rem;
  }

  span.tag {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${t.colors.accent};
  }

  h2 {
    margin-top: 0.5rem;
    font-size: clamp(1.875rem, 4vw, 2.75rem);
  }

  p.desc {
    margin-top: 1rem;
    color: ${t.colors.muted};
  }

  .price {
    margin-top: 1.25rem;
    font-family: ${t.fonts.serif};
    font-size: 1.75rem;
    color: ${t.colors.text};
  }
`;

const Finishes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;
`;

const FinishBtn = styled.button<{ $active: boolean }>`
  min-height: 44px;
  padding: 0 1rem;
  border-radius: ${t.radii.pill};
  font-size: 0.8125rem;
  border: 1px solid;

  ${({ $active }) =>
    $active
      ? css`
          background: ${t.colors.text};
          color: ${t.colors.bg};
          border-color: ${t.colors.text};
          font-weight: 600;
        `
      : css`
          background: ${t.colors.bgSecondary};
          color: ${t.colors.muted};
          border-color: ${t.colors.border};
        `}
`;

const Action = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  align-self: flex-start;
  min-height: 50px;
  margin-top: 1.75rem;
  padding: 0 1.75rem;
  border: 0;
  border-radius: ${t.radii.pill};
  background: ${t.colors.accent};
  color: ${t.colors.bg};
  font-weight: 700;
  font-size: 0.9375rem;

  &:hover {
    background: ${t.colors.accentHover};
  }
`;

interface Props {
  onAddToCart: (product: TimberProduct, finish: string) => void;
}

const spotlight = timberProducts.find((p) => p.id === "chamba-leather-armchair") ?? timberProducts[0];

export function FeaturedPromo({ onAddToCart }: Props) {
  const [selectedFinish, setSelectedFinish] = useState(
    spotlight?.finishes[0] ?? "Smoked Walnut / Cognac",
  );

  if (!spotlight) return null;

  return (
    <Section id="tl-promo" aria-labelledby="tl-promo-title">
      <TimberContainer>
        <Panel>
          <Media>
            <Image
              src={spotlight.image}
              alt={spotlight.name}
              fill
              sizes="(min-width: 1024px) 46vw, 94vw"
            />
          </Media>
          <Content>
            <span className="tag">Signature Commission</span>
            <h2 id="tl-promo-title">{spotlight.name}</h2>
            <p className="desc">{spotlight.details}</p>
            <p className="price">{formatTimberPrice(spotlight.price)}</p>

            <Finishes role="group" aria-label="Select signature chair finish">
              {spotlight.finishes.map((f) => (
                <FinishBtn
                  key={f}
                  type="button"
                  $active={selectedFinish === f}
                  aria-pressed={selectedFinish === f}
                  onClick={() => setSelectedFinish(f)}
                >
                  {f}
                </FinishBtn>
              ))}
            </Finishes>

            <Action type="button" onClick={() => onAddToCart(spotlight, selectedFinish)}>
              <ShoppingBag size={18} aria-hidden /> Add Signature Piece
            </Action>
          </Content>
        </Panel>
      </TimberContainer>
    </Section>
  );
}

