"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import styled from "styled-components";
import { formatTimberPrice, timberProducts, type TimberProduct } from "../data/timber-data";
import { timberMedia, timberTheme as t } from "../styles/theme";
import { TimberContainer } from "../components/TimberContainer";

const Section = styled.section`
  padding: 4.5rem 0;
  scroll-margin-top: ${t.layout.headerHeight};

  ${timberMedia.tablet} {
    padding: 5.5rem 0;
  }
`;

const Head = styled.div`
  margin-bottom: 2.25rem;

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
    font-size: clamp(1.875rem, 4.5vw, 2.75rem);
  }
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.25rem;

  ${timberMedia.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${timberMedia.desktop} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const Tile = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${t.colors.bgSecondary};
  border: 1px solid ${t.colors.border};
  border-radius: ${t.radii.md};
  overflow: hidden;
`;

const Media = styled.button`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  padding: 0;
  border: 0;
  overflow: hidden;
  background: ${t.colors.card};

  img {
    object-fit: cover;
    transition: transform 550ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  ${Tile}:hover & img {
    transform: scale(1.04);
  }
`;

const Tag = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.25rem 0.65rem;
  border-radius: ${t.radii.pill};
  background: ${t.colors.accent};
  color: ${t.colors.bg};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Info = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem 1.125rem 1.125rem;

  h3 {
    font-size: 1.1875rem;
  }

  span.dim {
    margin-top: 0.25rem;
    font-size: 0.8125rem;
    color: ${t.colors.muted};
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;

  strong {
    font-size: 1rem;
    color: ${t.colors.text};
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 1px solid ${t.colors.borderStrong};
    border-radius: ${t.radii.pill};
    background: ${t.colors.card};
    color: ${t.colors.text};
    transition: all ${t.transitions.base};

    &:hover {
      background: ${t.colors.accent};
      border-color: ${t.colors.accent};
      color: ${t.colors.bg};
    }
  }
`;

interface Props {
  onInspectProduct: (product: TimberProduct) => void;
  onAddToCart: (product: TimberProduct, finish: string) => void;
}

export function NewArrivals({ onInspectProduct, onAddToCart }: Props) {
  const arrivals = timberProducts.filter((p) => p.isNewArrival);

  return (
    <Section id="tl-new" aria-labelledby="tl-new-title">
      <TimberContainer>
        <Head>
          <span className="eyebrow">Just Released</span>
          <h2 id="tl-new-title">New Arrivals</h2>
        </Head>

        <Grid>
          {arrivals.map((product) => (
            <li key={product.id}>
              <Tile>
                <Media
                  type="button"
                  onClick={() => onInspectProduct(product)}
                  aria-label={`Inspect new arrival ${product.name}`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 768px) 46vw, 94vw"
                  />
                  <Tag>New</Tag>
                </Media>
                <Info>
                  <h3>{product.name}</h3>
                  <span className="dim">{product.dimensions}</span>
                  <Row>
                    <strong>{formatTimberPrice(product.price)}</strong>
                    <button
                      type="button"
                      aria-label={`Add ${product.name} to bag`}
                      onClick={() => onAddToCart(product, product.finishes[0] ?? "Smoked Walnut")}
                    >
                      <Plus size={18} aria-hidden />
                    </button>
                  </Row>
                </Info>
              </Tile>
            </li>
          ))}
        </Grid>
      </TimberContainer>
    </Section>
  );
}

