"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styled from "styled-components";
import { oaklineTheme as t, oakMedia } from "../styles/theme";
import { OakContainer } from "../components/OakContainer";

const Section = styled.section`
  padding: 2.5rem 0 4rem;
  ${oakMedia.tablet} {
    padding: 3.5rem 0 5rem;
  }
  ${oakMedia.desktop} {
    padding: 4.5rem 0 6rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2.25rem;
  align-items: center;

  ${oakMedia.desktop} {
    grid-template-columns: 0.92fr 1.08fr;
    gap: 4rem;
  }
`;

const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${t.colors.oak};

  &::before {
    content: "";
    width: 28px;
    height: 1px;
    background: ${t.colors.oak};
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4.35rem);
  font-weight: 600;
  line-height: 1.04;

  em {
    font-style: italic;
    font-weight: 500;
    color: ${t.colors.oak};
  }
`;

const Lead = styled.p`
  max-width: 34rem;
  margin-top: 1.25rem;
  font-size: 1.0625rem;
  color: ${t.colors.umber};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;

  ${oakMedia.tablet} {
    flex-direction: row;
  }
`;

const PrimaryCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 50px;
  padding: 0 1.75rem;
  border-radius: ${t.radii.pill};
  background: ${t.colors.espresso};
  color: ${t.colors.white};
  font-weight: 500;
  font-size: 0.9375rem;
  transition: background ${t.transitions.base};

  &:hover {
    background: ${t.colors.oak};
  }
`;

const SecondaryCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 1.75rem;
  border-radius: ${t.radii.pill};
  border: 1px solid ${t.colors.espresso};
  color: ${t.colors.espresso};
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all ${t.transitions.base};

  &:hover {
    background: ${t.colors.espresso};
    color: ${t.colors.white};
  }
`;

const Stats = styled.dl`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 1.75rem;
  border-top: 1px solid ${t.colors.border};

  dt {
    font-size: 0.75rem;
    color: ${t.colors.umber};
    margin-top: 0.25rem;
  }

  dd {
    margin: 0;
    font-family: ${t.fonts.display};
    font-size: 1.5rem;
    font-weight: 700;
    ${oakMedia.tablet} {
      font-size: 1.75rem;
    }
  }
`;

const ImageFrame = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: ${t.radii.md};
  overflow: hidden;
  background: ${t.colors.linen};
  box-shadow: ${t.shadows.elevated};

  img {
    object-fit: cover;
  }
`;

export function HeroBanner() {
  return (
    <Section aria-labelledby="oak-hero-title">
      <OakContainer>
        <Grid>
          <div>
            <Eyebrow>Autumn Living Collection</Eyebrow>
            <Title id="oak-hero-title">
              Crafted in Solid Oak. Built for <em>Quiet</em> Living.
            </Title>
            <Lead>
              Architectural furniture hand-finished in European white oak, Belgian linen, and
              honed travertine. Designed to soften modern homes and age gracefully for decades.
            </Lead>
            <Actions>
              <PrimaryCta href="#oak-products">
                Explore Best Sellers <ArrowRight size={17} aria-hidden />
              </PrimaryCta>
              <SecondaryCta href="#oak-collections">Browse Collections</SecondaryCta>
            </Actions>
            <Stats>
              <div>
                <dd>10-Yr</dd>
                <dt>Timber Warranty</dt>
              </div>
              <div>
                <dd>100%</dd>
                <dt>Kiln-Dried Oak</dt>
              </div>
              <div>
                <dd>14 Days</dd>
                <dt>Home Dispatch</dt>
              </div>
            </Stats>
          </div>

          <ImageFrame>
            <Image
              src="/templates/oakline-interiors/hero-showroom.jpg"
              alt="Sunlit Oakline Interiors showroom with linen sofa and travertine table"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 94vw"
            />
          </ImageFrame>
        </Grid>
      </OakContainer>
    </Section>
  );
}
