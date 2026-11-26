"use client";

import { useState } from "react";
import { Check, PackageOpen } from "lucide-react";
import styled from "styled-components";
import { oaklineTheme as t, oakMedia } from "../styles/theme";
import { OakContainer } from "../components/OakContainer";

const Section = styled.section`
  padding: 1rem 0 4rem;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2.25rem 1.5rem;
  border-radius: ${t.radii.md};
  background: ${t.colors.walnut};
  color: ${t.colors.cream};

  ${oakMedia.tablet} {
    padding: 3rem 2.75rem;
  }

  ${oakMedia.desktop} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  span.tag {
    display: inline-block;
    margin-bottom: 0.625rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${t.colors.oak};
  }

  h2 {
    font-size: clamp(1.75rem, 4.5vw, 2.5rem);
    color: ${t.colors.white};
  }

  p {
    max-width: 48ch;
    margin-top: 0.625rem;
    color: rgba(250, 246, 240, 0.78);
    font-size: 0.9375rem;
  }
`;

const SwatchBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;
  min-height: 50px;
  padding: 0 1.75rem;
  border: 0;
  border-radius: ${t.radii.pill};
  background: ${t.colors.oak};
  color: ${t.colors.white};
  font-weight: 600;
  font-size: 0.9375rem;
  transition: background ${t.transitions.base};

  &:hover {
    background: ${t.colors.oakHover};
  }
`;

export function PromoBanner() {
  const [requested, setRequested] = useState(false);

  return (
    <Section aria-label="Complimentary material swatches">
      <OakContainer>
        <Banner>
          <div>
            <span className="tag">Material Library</span>
            <h2>Experience Our Timber &amp; Linen at Home</h2>
            <p>
              Order a complimentary swatch box containing solid white oak, smoked walnut, ash, and
              our signature Belgian linen weaves before you choose your piece.
            </p>
          </div>
          <SwatchBtn type="button" onClick={() => setRequested(true)}>
            {requested ? (
              <>
                <Check size={18} aria-hidden /> Swatch Box Reserved (Demo)
              </>
            ) : (
              <>
                <PackageOpen size={18} aria-hidden /> Request Free Swatch Box
              </>
            )}
          </SwatchBtn>
        </Banner>
      </OakContainer>
    </Section>
  );
}
