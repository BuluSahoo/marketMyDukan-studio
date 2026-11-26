"use client";

import Image from "next/image";
import styled from "styled-components";
import { oaklineTheme as t, oakMedia } from "../styles/theme";
import { OakContainer } from "../components/OakContainer";

const Section = styled.section`
  padding: 4.5rem 0;
  scroll-margin-top: ${t.layout.headerHeight};

  ${oakMedia.tablet} {
    padding: 6rem 0;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  align-items: center;

  ${oakMedia.desktop} {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 4.5rem;
  }
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: ${t.radii.md};
  overflow: hidden;
  background: ${t.colors.linen};

  img {
    object-fit: cover;
  }
`;

const Content = styled.div`
  span.eyebrow {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${t.colors.oak};
    margin-bottom: 0.75rem;
  }

  h2 {
    font-size: clamp(2rem, 5vw, 3.125rem);
  }

  p {
    margin-top: 1.25rem;
    color: ${t.colors.umber};
    font-size: 1rem;
  }
`;

const Pillars = styled.ul`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${t.colors.border};

  ${oakMedia.tablet} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  strong {
    display: block;
    font-family: ${t.fonts.display};
    font-size: 1.75rem;
    color: ${t.colors.espresso};
  }

  span {
    font-size: 0.8125rem;
    color: ${t.colors.umber};
  }
`;

export function BrandStory() {
  return (
    <Section id="oak-story" aria-labelledby="oak-story-title">
      <OakContainer>
        <Grid>
          <Media>
            <Image
              src="/templates/oakline-interiors/story-workshop.jpg"
              alt="Oakline Interiors woodworking bench with solid white oak joinery"
              fill
              sizes="(min-width: 1024px) 48vw, 94vw"
            />
          </Media>

          <Content>
            <span className="eyebrow">Our Craft</span>
            <h2 id="oak-story-title">Honest Timber, Joined Without Shortcuts</h2>
            <p>
              Every Oakline piece begins with FSC-certified white oak and walnut kiln-dried to
              Indian climate humidity standards. Instead of hollow veneers or staples, our
              joiners use traditional mortise-and-tenon joints finished by hand in natural plant
              oils.
            </p>
            <p>
              We produce in small studio batches so each dining slab and sofa plinth preserves
              continuous, unhurried grain character.
            </p>
            <Pillars>
              <li>
                <strong>42</strong>
                <span>Master woodworkers &amp; upholsterers</span>
              </li>
              <li>
                <strong>Zero</strong>
                <span>Particleboard or MDF cores</span>
              </li>
              <li>
                <strong>10-Year</strong>
                <span>Structural joinery guarantee</span>
              </li>
            </Pillars>
          </Content>
        </Grid>
      </OakContainer>
    </Section>
  );
}
