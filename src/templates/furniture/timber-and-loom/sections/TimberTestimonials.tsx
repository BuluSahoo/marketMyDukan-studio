"use client";

import styled from "styled-components";
import { timberTestimonials } from "../data/timber-data";
import { timberMedia, timberTheme as t } from "../styles/theme";
import { TimberContainer } from "../components/TimberContainer";

const Section = styled.section`
  padding: 4.5rem 0;
  background: ${t.colors.bgSecondary};
  border-top: 1px solid ${t.colors.border};
  border-bottom: 1px solid ${t.colors.border};

  ${timberMedia.tablet} {
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
    color: ${t.colors.accent};
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: clamp(2rem, 5vw, 3rem);
  }
`;

const Layout = styled.div`
  display: grid;
  gap: 1.25rem;

  ${timberMedia.desktop} {
    grid-template-columns: 1.15fr 1fr;
    gap: 1.5rem;
  }
`;

const Stack = styled.div`
  display: grid;
  gap: 1.25rem;
`;

const Quote = styled.blockquote<{ $lead?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: ${({ $lead }) => ($lead ? "2rem" : "1.5rem")};
  background: ${t.colors.card};
  border: 1px solid ${t.colors.border};
  border-radius: ${t.radii.md};

  p {
    font-family: ${({ $lead }) => ($lead ? t.fonts.serif : t.fonts.sans)};
    font-size: ${({ $lead }) => ($lead ? "1.375rem" : "0.9375rem")};
    line-height: 1.5;
    color: ${t.colors.text};
  }

  footer {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid ${t.colors.border};
    font-size: 0.8125rem;
    color: ${t.colors.muted};
  }

  strong {
    display: block;
    color: ${t.colors.accent};
    font-size: 0.9375rem;
  }
`;

export function TimberTestimonials() {
  const [first, second, third] = timberTestimonials;
  if (!first || !second || !third) return null;

  return (
    <Section aria-labelledby="tl-reviews-title">
      <TimberContainer>
        <Head>
          <span className="eyebrow">Collector Notes</span>
          <h2 id="tl-reviews-title">Inside Private Homes &amp; Retreats</h2>
        </Head>

        <Layout>
          <Quote $lead>
            <p>&ldquo;{first.quote}&rdquo;</p>
            <footer>
              <strong>{first.author}</strong>
              <span>
                {first.title} · {first.piece}
              </span>
            </footer>
          </Quote>

          <Stack>
            {[second, third].map((item) => (
              <Quote key={item.id}>
                <p>&ldquo;{item.quote}&rdquo;</p>
                <footer>
                  <strong>{item.author}</strong>
                  <span>
                    {item.title} · {item.piece}
                  </span>
                </footer>
              </Quote>
            ))}
          </Stack>
        </Layout>
      </TimberContainer>
    </Section>
  );
}

