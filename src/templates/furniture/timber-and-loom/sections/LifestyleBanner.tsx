"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styled from "styled-components";
import { timberProducts, type TimberProduct } from "../data/timber-data";
import { timberMedia, timberTheme as t } from "../styles/theme";
import { TimberContainer } from "../components/TimberContainer";

const Section = styled.section`
  padding: 4.5rem 0;
  scroll-margin-top: ${t.layout.headerHeight};
`;

const Frame = styled.div`
  position: relative;
  min-height: 440px;
  display: flex;
  align-items: flex-end;
  border-radius: ${t.radii.lg};
  overflow: hidden;
  border: 1px solid ${t.colors.borderStrong};

  ${timberMedia.tablet} {
    min-height: 520px;
  }

  img {
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(23, 24, 23, 0.1) 20%, rgba(23, 24, 23, 0.92) 100%);
  }
`;

const Card = styled.div`
  position: relative;
  z-index: 2;
  max-width: 36rem;
  padding: 2rem 1.5rem;

  ${timberMedia.tablet} {
    padding: 3rem;
  }

  span {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${t.colors.accent};
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: clamp(1.875rem, 5vw, 2.75rem);
  }

  p {
    margin-top: 0.75rem;
    color: ${t.colors.muted};
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 48px;
    margin-top: 1.5rem;
    padding: 0 1.5rem;
    border: 1px solid ${t.colors.accent};
    border-radius: ${t.radii.pill};
    background: rgba(23, 24, 23, 0.75);
    color: ${t.colors.text};
    font-weight: 600;
    font-size: 0.9375rem;

    &:hover {
      background: ${t.colors.accent};
      color: ${t.colors.bg};
    }
  }
`;

interface Props {
  onInspectProduct: (product: TimberProduct) => void;
}

const roomPiece = timberProducts.find((p) => p.id === "travertine-low-console") ?? timberProducts[0];

export function LifestyleBanner({ onInspectProduct }: Props) {
  return (
    <Section id="tl-lifestyle" aria-labelledby="tl-life-title">
      <TimberContainer>
        <Frame>
          <Image
            src="/templates/timber-and-loom/lifestyle-courtyard.jpg"
            alt="Evening light inside a Timber and Loom architectural courtyard room"
            fill
            sizes="94vw"
          />
          <Card>
            <span>Architectural Spaces</span>
            <h2 id="tl-life-title">Evening Light in the Courtyard Room</h2>
            <p>
              Pair fluted smoked oak storage with sculptural linen lighting to turn quiet evening
              corners into calm focal points.
            </p>
            {roomPiece && (
              <button type="button" onClick={() => onInspectProduct(roomPiece)}>
                Inspect Featured Console <ArrowRight size={17} aria-hidden />
              </button>
            )}
          </Card>
        </Frame>
      </TimberContainer>
    </Section>
  );
}

