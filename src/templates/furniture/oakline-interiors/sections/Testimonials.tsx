"use client";

import { Star } from "lucide-react";
import styled from "styled-components";
import { oaklineTestimonials } from "../data/oakline-data";
import { oaklineTheme as t, oakMedia } from "../styles/theme";
import { OakContainer } from "../components/OakContainer";

const Section = styled.section`
  padding: 4.5rem 0;
  background: ${t.colors.linen};
  border-top: 1px solid ${t.colors.border};
  border-bottom: 1px solid ${t.colors.border};
  scroll-margin-top: ${t.layout.headerHeight};

  ${oakMedia.tablet} {
    padding: 5.5rem 0;
  }
`;

const Head = styled.div`
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
  gap: 1.25rem;

  ${oakMedia.desktop} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }
`;

const QuoteCard = styled.blockquote`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 1.75rem;
  background: ${t.colors.white};
  border: 1px solid ${t.colors.border};
  border-radius: ${t.radii.md};

  .stars {
    display: inline-flex;
    gap: 0.2rem;
    color: ${t.colors.oak};
    margin-bottom: 1rem;
  }

  p {
    flex: 1;
    font-size: 0.9375rem;
    color: ${t.colors.espresso};
  }

  footer {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid ${t.colors.border};
    font-size: 0.8125rem;
    color: ${t.colors.umber};
  }

  strong {
    display: block;
    color: ${t.colors.espresso};
    font-size: 0.9375rem;
  }
`;

export function Testimonials() {
  return (
    <Section id="oak-reviews" aria-labelledby="oak-reviews-title">
      <OakContainer>
        <Head>
          <span className="eyebrow">In Real Homes</span>
          <h2 id="oak-reviews-title">Loved by Homeowners &amp; Architects</h2>
        </Head>

        <Grid>
          {oaklineTestimonials.map((testimonial) => (
            <QuoteCard key={testimonial.id}>
              <div className="stars" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} size={15} fill="currentColor" aria-hidden />
                ))}
              </div>
              <p>&ldquo;{testimonial.quote}&rdquo;</p>
              <footer>
                <strong>{testimonial.author}</strong>
                <span>
                  {testimonial.roleOrCity} · {testimonial.piece}
                </span>
              </footer>
            </QuoteCard>
          ))}
        </Grid>
      </OakContainer>
    </Section>
  );
}
