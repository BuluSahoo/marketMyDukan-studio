"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styled from "styled-components";
import { oaklineCategories, type OaklineCategory } from "../data/oakline-data";
import { oaklineTheme as t, oakMedia } from "../styles/theme";
import { OakContainer } from "../components/OakContainer";

const Section = styled.section`
  padding: 4rem 0;
  background: ${t.colors.linen};
  border-top: 1px solid ${t.colors.border};
  border-bottom: 1px solid ${t.colors.border};

  ${oakMedia.tablet} {
    padding: 5.5rem 0;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2.25rem;

  ${oakMedia.tablet} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

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

  p {
    max-width: 32ch;
    color: ${t.colors.umber};
    font-size: 0.9375rem;
  }
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.875rem;

  ${oakMedia.tablet} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
  }

  ${oakMedia.desktop} {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`;

const CardBtn = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 1px solid ${t.colors.border};
  border-radius: ${t.radii.md};
  background: ${t.colors.white};
  overflow: hidden;
  text-align: left;
  transition: transform ${t.transitions.base},
    border-color ${t.transitions.base},
    box-shadow ${t.transitions.base};

  &:hover {
    transform: translateY(-4px);
    border-color: ${t.colors.oak};
    box-shadow: ${t.shadows.soft};
  }
`;

const Media = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: ${t.colors.cream};

  img {
    object-fit: cover;
    transition: transform 550ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  ${CardBtn}:hover & img {
    transform: scale(1.04);
  }
`;

const Caption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  padding: 0.875rem 1rem;

  h3 {
    font-size: 1.125rem;
  }

  svg {
    flex-shrink: 0;
    color: ${t.colors.oak};
  }
`;

interface Props {
  onSelectCategory: (category: OaklineCategory) => void;
}

export function FeaturedCategories({ onSelectCategory }: Props) {
  return (
    <Section id="oak-categories" aria-labelledby="oak-categories-title">
      <OakContainer>
        <Head>
          <div>
            <span className="eyebrow">Shop by room &amp; form</span>
            <h2 id="oak-categories-title">Featured Categories</h2>
          </div>
          <p>Select a furniture category to browse matching showroom pieces below.</p>
        </Head>

        <Grid>
          {oaklineCategories.map((cat) => (
            <li key={cat.slug}>
              <CardBtn
                type="button"
                onClick={() => onSelectCategory(cat.name)}
                aria-label={`Filter furniture by ${cat.name}`}
              >
                <Media>
                  <Image
                    src={cat.image}
                    alt={`${cat.name} — ${cat.tagline}`}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 768px) 30vw, 46vw"
                  />
                </Media>
                <Caption>
                  <h3>{cat.name}</h3>
                  <ArrowUpRight size={17} aria-hidden />
                </Caption>
              </CardBtn>
            </li>
          ))}
        </Grid>
      </OakContainer>
    </Section>
  );
}
