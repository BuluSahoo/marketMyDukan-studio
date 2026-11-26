"use client";

import Image from "next/image";
import { Eye, ShoppingBag } from "lucide-react";
import styled, { css } from "styled-components";
import {
  TIMBER_CATEGORIES,
  formatTimberPrice,
  timberProducts,
  type TimberCategory,
  type TimberProduct,
} from "../data/timber-data";
import { timberMedia, timberTheme as t } from "../styles/theme";
import { TimberContainer } from "../components/TimberContainer";

export type TimberCategoryFilter = "All" | TimberCategory;

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

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  ${timberMedia.desktop} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

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
    font-size: clamp(2rem, 5vw, 3.125rem);
  }
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${timberMedia.desktop} {
    flex-wrap: wrap;
    overflow-x: visible;
  }
`;

const Tab = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  min-height: 44px;
  padding: 0 1.125rem;
  border-radius: ${t.radii.pill};
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid;
  transition: all ${t.transitions.base};

  ${({ $active }) =>
    $active
      ? css`
          background: ${t.colors.accent};
          color: ${t.colors.bg};
          border-color: ${t.colors.accent};
          font-weight: 700;
        `
      : css`
          background: ${t.colors.card};
          color: ${t.colors.muted};
          border-color: ${t.colors.border};
          &:hover {
            color: ${t.colors.text};
            border-color: ${t.colors.borderStrong};
          }
        `}
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;

  ${timberMedia.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${timberMedia.desktop} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.75rem;
  }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${t.colors.card};
  border: 1px solid ${t.colors.border};
  border-radius: ${t.radii.md};
  overflow: hidden;
  transition: border-color ${t.transitions.base}, transform ${t.transitions.base};

  &:hover {
    border-color: ${t.colors.accent};
    transform: translateY(-3px);
  }
`;

const MediaBtn = styled.button`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  padding: 0;
  border: 0;
  overflow: hidden;
  background: ${t.colors.bg};

  img {
    object-fit: cover;
    transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  ${Card}:hover & img {
    transform: scale(1.04);
  }
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.25rem;
  gap: 0.5rem;

  .cat {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${t.colors.accent};
  }

  h3 {
    font-size: 1.375rem;
  }

  p {
    font-size: 0.875rem;
    color: ${t.colors.muted};
  }
`;

const Foot = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${t.colors.border};

  strong {
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

const BtnRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const InspectBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 44px;
  padding: 0 0.875rem;
  border: 1px solid ${t.colors.borderStrong};
  border-radius: ${t.radii.pill};
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;

  &:hover {
    border-color: ${t.colors.accent};
  }
`;

const AddBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 44px;
  padding: 0 1rem;
  border: 0;
  border-radius: ${t.radii.pill};
  background: ${t.colors.accent};
  color: ${t.colors.bg};
  font-size: 0.8125rem;
  font-weight: 700;

  &:hover {
    background: ${t.colors.accentHover};
  }
`;

const ALL_CATS: readonly TimberCategoryFilter[] = ["All", ...TIMBER_CATEGORIES];

interface Props {
  activeCategory: TimberCategoryFilter;
  onSelectCategory: (cat: TimberCategoryFilter) => void;
  onInspectProduct: (product: TimberProduct) => void;
  onAddToCart: (product: TimberProduct, finish: string) => void;
}

export function BestSellers({
  activeCategory,
  onSelectCategory,
  onInspectProduct,
  onAddToCart,
}: Props) {
  const items =
    activeCategory === "All"
      ? timberProducts.filter((p) => p.isBestSeller)
      : timberProducts.filter((p) => p.category === activeCategory);

  return (
    <Section id="tl-bestsellers" aria-labelledby="tl-best-title">
      <TimberContainer>
        <Top>
          <div>
            <span className="eyebrow">Atelier Editions</span>
            <h2 id="tl-best-title">Best-Selling Furniture</h2>
          </div>

          <FilterBar role="group" aria-label="Filter furniture by category">
            {ALL_CATS.map((cat) => (
              <Tab
                key={cat}
                type="button"
                $active={activeCategory === cat}
                aria-pressed={activeCategory === cat}
                onClick={() => onSelectCategory(cat)}
              >
                {cat}
              </Tab>
            ))}
          </FilterBar>
        </Top>

        <Grid>
          {items.map((product) => (
            <li key={product.id}>
              <Card>
                <MediaBtn
                  type="button"
                  onClick={() => onInspectProduct(product)}
                  aria-label={`Inspect ${product.name}`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 94vw"
                  />
                </MediaBtn>
                <Body>
                  <span className="cat">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.shortDesc}</p>

                  <Foot>
                    <strong>{formatTimberPrice(product.price)}</strong>
                    <BtnRow>
                      <InspectBtn
                        type="button"
                        onClick={() => onInspectProduct(product)}
                        aria-label={`View details for ${product.name}`}
                      >
                        <Eye size={15} aria-hidden /> Details
                      </InspectBtn>
                      <AddBtn
                        type="button"
                        onClick={() => onAddToCart(product, product.finishes[0] ?? "Smoked Walnut")}
                      >
                        <ShoppingBag size={15} aria-hidden /> Add
                      </AddBtn>
                    </BtnRow>
                  </Foot>
                </Body>
              </Card>
            </li>
          ))}
        </Grid>
      </TimberContainer>
    </Section>
  );
}

