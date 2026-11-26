"use client";

import Image from "next/image";
import styled from "styled-components";
import { timberMedia, timberTheme as t } from "../styles/theme";
import { TimberContainer } from "../components/TimberContainer";

const Section = styled.section`
  padding: 4.5rem 0;
  background: ${t.colors.bgSecondary};
  border-top: 1px solid ${t.colors.border};
  border-bottom: 1px solid ${t.colors.border};
  scroll-margin-top: ${t.layout.headerHeight};

  ${timberMedia.tablet} {
    padding: 6rem 0;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  align-items: center;

  ${timberMedia.desktop} {
    grid-template-columns: 1fr 1fr;
    gap: 4.5rem;
  }
`;

const Copy = styled.div`
  span.eyebrow {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${t.colors.accent};
    margin-bottom: 0.75rem;
  }

  h2 {
    font-size: clamp(2rem, 5vw, 3.25rem);
  }

  p.quote {
    margin-top: 1.25rem;
    font-family: ${t.fonts.serif};
    font-style: italic;
    font-size: 1.25rem;
    color: ${t.colors.text};
  }

  p.body {
    margin-top: 1rem;
    color: ${t.colors.muted};
  }
`;

const Materials = styled.ul`
  display: grid;
  gap: 0.875rem;
  margin-top: 2rem;

  li {
    padding: 1rem 1.25rem;
    border-radius: ${t.radii.sm};
    background: ${t.colors.card};
    border: 1px solid ${t.colors.border};
  }

  strong {
    display: block;
    font-size: 0.9375rem;
    color: ${t.colors.accent};
  }

  span {
    font-size: 0.875rem;
    color: ${t.colors.muted};
  }
`;

const Frame = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: ${t.radii.md};
  overflow: hidden;
  border: 1px solid ${t.colors.borderStrong};

  img {
    object-fit: cover;
  }
`;

export function BrandPhilosophy() {
  return (
    <Section id="tl-philosophy" aria-labelledby="tl-phil-title">
      <TimberContainer>
        <Grid>
          <Copy>
            <span className="eyebrow">Material Philosophy</span>
            <h2 id="tl-phil-title">Timber That Deepens, Loom That Softens</h2>
            <p className="quote">
              &ldquo;Furniture should never shout in bright rooms — it should anchor the quiet
              hours.&rdquo;
            </p>
            <p className="body">
              Our studio brings together traditional Indian woodcarving with handloom weavers across
              Gujarat and Himachal. Rather than sealing timber under glossy plastics, we nourish
              every plank in cold-pressed tung oil and beeswax.
            </p>
            <Materials>
              <li>
                <strong>Kiln-Seasoned Smoked Teak</strong>
                <span>Steamed naturally for rich espresso depth without synthetic stains.</span>
              </li>
              <li>
                <strong>Hand-Spun Khadi &amp; Wool Bouclé</strong>
                <span>Woven on pit looms in unbleached oat and deep mineral charcoal.</span>
              </li>
              <li>
                <strong>Unlacquered Cast Bronze</strong>
                <span>Hardware that develops a living patina alongside your home.</span>
              </li>
            </Materials>
          </Copy>

          <Frame>
            <Image
              src="/templates/timber-and-loom/philosophy-craft.jpg"
              alt="Timber and Loom woodworking artisan studio"
              fill
              sizes="(min-width: 1024px) 46vw, 94vw"
            />
          </Frame>
        </Grid>
      </TimberContainer>
    </Section>
  );
}

