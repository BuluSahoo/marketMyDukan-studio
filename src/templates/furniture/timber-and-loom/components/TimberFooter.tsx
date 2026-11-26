"use client";

import styled from "styled-components";
import { TIMBER_CATEGORIES, type TimberCategory } from "../data/timber-data";
import { timberMedia, timberTheme as t } from "../styles/theme";
import { TimberContainer } from "./TimberContainer";

const Wrap = styled.footer`
  background: #121312;
  border-top: 1px solid ${t.colors.border};
  padding: 4rem 0 2rem;
  color: ${t.colors.muted};
`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;

  ${timberMedia.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${timberMedia.desktop} {
    grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
    gap: 3rem;
  }
`;

const BrandTitle = styled.p`
  font-family: ${t.fonts.serif};
  font-size: 1.625rem;
  color: ${t.colors.text};

  span {
    color: ${t.colors.accent};
    font-style: italic;
  }
`;

const About = styled.p`
  max-width: 34ch;
  margin-top: 0.75rem;
  font-size: 0.9375rem;
`;

const Col = styled.div`
  h3 {
    font-family: ${t.fonts.sans};
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${t.colors.accent};
    margin-bottom: 0.75rem;
  }

  a,
  button {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0;
    border: 0;
    background: transparent;
    color: ${t.colors.muted};
    font-size: 0.9375rem;
    text-align: left;

    &:hover {
      color: ${t.colors.text};
    }
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.7;
  }

  strong {
    color: ${t.colors.text};
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${t.colors.border};
  font-size: 0.8125rem;

  ${timberMedia.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

interface Props {
  onSelectCategory: (cat: TimberCategory) => void;
}

export function TimberFooter({ onSelectCategory }: Props) {
  return (
    <Wrap>
      <TimberContainer>
        <Grid>
          <div>
            <BrandTitle>
              Timber <span>&amp;</span> Loom
            </BrandTitle>
            <About>
              Architectural dark-timber furniture &amp; handwoven natural textiles crafted for
              collectors and calm residences.
            </About>
          </div>

          <Col>
            <h3>Collections</h3>
            <ul>
              {TIMBER_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button type="button" onClick={() => onSelectCategory(cat)}>
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </Col>

          <Col>
            <h3>Ateliers</h3>
            <p>
              <strong>New Delhi</strong>
              <br />
              Mehrauli Design District
              <br />
              Tue–Sun · 11:00 AM – 7:30 PM
            </p>
            <p style={{ marginTop: "1rem" }}>
              <strong>Goa</strong>
              <br />
              Assagao Courtyard Gallery
              <br />
              Wed–Sun · 11:00 AM – 7:00 PM
            </p>
          </Col>

          <Col>
            <h3>Private Concierge</h3>
            <ul>
              <li>
                <a href="mailto:atelier@timberandloom.example">atelier@timberandloom.example</a>
              </li>
              <li>
                <a href="#tl-philosophy">Material &amp; Loom Care</a>
              </li>
              <li>
                <a href="#tl-promo">Signature Commissions</a>
              </li>
            </ul>
          </Col>
        </Grid>

        <Bottom>
          <span>© {new Date().getFullYear()} Timber &amp; Loom. Demo Storefront.</span>
          <span>Smoked Burma Teak · Handloom Wool · Cast Bronze</span>
        </Bottom>
      </TimberContainer>
    </Wrap>
  );
}

