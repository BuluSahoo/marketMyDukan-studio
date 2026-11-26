"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styled from "styled-components";
import { oaklineCollections, type OaklineCategory } from "../data/oakline-data";
import { oaklineTheme as t, oakMedia } from "../styles/theme";
import { OakContainer } from "../components/OakContainer";

const Section = styled.section`
  padding: 4.5rem 0;
  background: ${t.colors.white};
  border-top: 1px solid ${t.colors.border};
  border-bottom: 1px solid ${t.colors.border};
  scroll-margin-top: ${t.layout.headerHeight};

  ${oakMedia.tablet} {
    padding: 6rem 0;
  }
`;

const Head = styled.div`
  max-width: 40rem;
  margin-bottom: 2.5rem;

  span.eyebrow {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${t.colors.oak};
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: clamp(2rem, 5vw, 3rem);
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;

  ${oakMedia.desktop} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: ${t.radii.md};
  overflow: hidden;
  background: ${t.colors.cream};
  border: 1px solid ${t.colors.border};
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 16 / 11;
  background: ${t.colors.linen};

  img {
    object-fit: cover;
  }
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.5rem;

  span.count {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${t.colors.oak};
  }

  h3 {
    margin-top: 0.4rem;
    font-size: 1.625rem;
  }

  p {
    margin-top: 0.625rem;
    color: ${t.colors.umber};
    font-size: 0.9375rem;
  }

  button {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 44px;
    margin-top: 1.25rem;
    padding: 0;
    border: 0;
    background: transparent;
    font-weight: 600;
    font-size: 0.9375rem;
    color: ${t.colors.espresso};
    border-bottom: 1.5px solid ${t.colors.oak};
  }
`;

interface Props {
  onSelectCollection: (category: OaklineCategory) => void;
}

export function FeaturedCollections({ onSelectCollection }: Props) {
  return (
    <Section id="oak-collections" aria-labelledby="oak-collections-title">
      <OakContainer>
        <Head>
          <span className="eyebrow">Curated Interiors</span>
          <h2 id="oak-collections-title">Featured Collections</h2>
        </Head>

        <Grid>
          {oaklineCollections.map((col) => (
            <Card key={col.id}>
              <Media>
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, 94vw"
                />
              </Media>
              <Body>
                <span className="count">{col.pieceCount} Pieces</span>
                <h3>{col.title}</h3>
                <p>{col.subtitle}</p>
                <button type="button" onClick={() => onSelectCollection(col.categoryFilter)}>
                  Shop This Edit <ArrowRight size={16} aria-hidden />
                </button>
              </Body>
            </Card>
          ))}
        </Grid>
      </OakContainer>
    </Section>
  );
}
