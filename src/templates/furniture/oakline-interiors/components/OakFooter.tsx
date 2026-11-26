"use client";

import styled from "styled-components";
import { oaklineCategories, type OaklineCategory } from "../data/oakline-data";
import { oaklineTheme as t, oakMedia } from "../styles/theme";
import { OakContainer } from "./OakContainer";

const Wrap = styled.footer`
  background: ${t.colors.walnut};
  color: rgba(250, 246, 240, 0.8);
  padding: 4rem 0 2rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;

  ${oakMedia.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${oakMedia.desktop} {
    grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
    gap: 3rem;
  }
`;

const BrandTitle = styled.p`
  font-family: ${t.fonts.display};
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${t.colors.white};
`;

const About = styled.p`
  max-width: 34ch;
  margin-top: 0.75rem;
  font-size: 0.9375rem;
  color: rgba(250, 246, 240, 0.68);
`;

const Col = styled.div`
  h3 {
    font-family: ${t.fonts.sans};
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${t.colors.oak};
    margin-bottom: 0.75rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  a,
  button {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0;
    border: 0;
    background: transparent;
    font-size: 0.9375rem;
    color: rgba(250, 246, 240, 0.76);
    text-align: left;

    &:hover {
      color: ${t.colors.white};
    }
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: rgba(250, 246, 240, 0.76);
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(250, 246, 240, 0.14);
  font-size: 0.8125rem;
  color: rgba(250, 246, 240, 0.56);

  ${oakMedia.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

interface Props {
  onSelectCategory: (cat: OaklineCategory) => void;
}

export function OakFooter({ onSelectCategory }: Props) {
  return (
    <Wrap>
      <OakContainer>
        <Grid>
          <div>
            <BrandTitle>Oakline Interiors</BrandTitle>
            <About>
              Contemporary solid oak furniture crafted in small batches for calm, enduring Indian
              homes.
            </About>
          </div>

          <Col>
            <h3>Furniture</h3>
            <ul>
              {oaklineCategories.map((cat) => (
                <li key={cat.slug}>
                  <button type="button" onClick={() => onSelectCategory(cat.name)}>
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </Col>

          <Col>
            <h3>Showrooms</h3>
            <p>
              <strong>Bengaluru</strong>
              <br />
              100 Feet Road, Indiranagar
              <br />
              Tue–Sun · 10:30 AM – 7:30 PM
            </p>
            <p style={{ marginTop: "1rem" }}>
              <strong>Mumbai</strong>
              <br />
              Raghuvanshi Mills, Lower Parel
              <br />
              Tue–Sun · 11:00 AM – 8:00 PM
            </p>
          </Col>

          <Col>
            <h3>Concierge</h3>
            <ul>
              <li>
                <a href="mailto:concierge@oaklineinteriors.example">
                  concierge@oaklineinteriors.example
                </a>
              </li>
              <li>
                <a href="#oak-story">10-Year Timber Guarantee</a>
              </li>
              <li>
                <a href="#oak-collections">Trade &amp; Architect Program</a>
              </li>
            </ul>
          </Col>
        </Grid>

        <Bottom>
          <span>© {new Date().getFullYear()} Oakline Interiors. Demo Storefront.</span>
          <span>Handcrafted Solid White Oak &amp; Belgian Linen</span>
        </Bottom>
      </OakContainer>
    </Wrap>
  );
}
