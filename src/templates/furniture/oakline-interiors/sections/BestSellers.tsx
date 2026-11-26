"use client";

import Image from "next/image";
import { Eye, ShoppingBag } from "lucide-react";
import styled, { css } from "styled-components";
import {
  OAKLINE_CATEGORIES,
  formatOaklinePrice,
  oaklineProducts,
  type OaklineCategory,
  type OaklineProduct,
} from "../data/oakline-data";
import { oaklineTheme as t, oakMedia } from "../styles/theme";
import { OakContainer } from "../components/OakContainer";

export type OaklineCategoryFilter = "All" | OaklineCategory;

const Section = styled.section`
  padding: 4.5rem 0;
  scroll-margin-top: ${t.layout.headerHeight};
  ${oakMedia.tablet} {
    padding: 6rem 0;
  }
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.25rem;

  ${oakMedia.desktop} {
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
    color: ${t.colors.oak};
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: clamp(2rem, 5vw, 3rem);
  }
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  ${oakMedia.desktop} {
    flex-wrap: wrap;
    overflow-x: visible;
  }
`;

const Pill = styled.button<{ $active: boolean }>`
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
          background: ${t.colors.espresso};
          color: ${t.colors.white};
          border-color: ${t.colors.espresso};
        `
      : css`
          background: ${t.colors.white};
          color: ${t.colors.umber};
          border-color: ${t.colors.border};
          &:hover {
            color: ${t.colors.espresso};
            border-color: ${t.colors.espresso};
          }
        `}
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;

  ${oakMedia.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${oakMedia.desktop} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;
  }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${t.colors.white};
  border: 1px solid ${t.colors.border};
  border-radius: ${t.radii.md};
  overflow: hidden;
  transition: box-shadow ${t.transitions.base};

  &:hover {
    box-shadow: ${t.shadows.elevated};
  }
`;

const MediaBtn = styled.button`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  padding: 0;
  border: 0;
  overflow: hidden;
  background: ${t.colors.linen};

  img {
    object-fit: cover;
    transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  ${Card}:hover & img {
    transform: scale(1.04);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 0.875rem;
  left: 0.875rem;
  padding: 0.3rem 0.75rem;
  border-radius: ${t.radii.pill};
  background: rgba(250, 246, 240, 0.94);
  color: ${t.colors.espresso};
  font-size: 0.75rem;
  font-weight: 600;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.25rem;
  gap: 0.5rem;

  .cat {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${t.colors.oak};
  }

  h3 {
    font-size: 1.375rem;
  }

  .dims {
    font-size: 0.8125rem;
    color: ${t.colors.umber};
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
  align-items: center;
  gap: 0.5rem;
`;

const GhostBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 44px;
  padding: 0 0.875rem;
  border: 1px solid ${t.colors.border};
  border-radius: ${t.radii.pill};
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;

  &:hover {
    border-color: ${t.colors.espresso};
  }
`;

const SolidBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 44px;
  padding: 0 1rem;
  border: 0;
  border-radius: ${t.radii.pill};
  background: ${t.colors.espresso};
  color: ${t.colors.white};
  font-size: 0.8125rem;
  font-weight: 500;
  transition: background ${t.transitions.base};

  &:hover {
    background: ${t.colors.oak};
  }
`;

interface Props {
  activeCategory: OaklineCategoryFilter;
  onSelectCategory: (cat: OaklineCategoryFilter) => void;
  onInspectProduct: (product: OaklineProduct) => void;
  onAddToCart: (product: OaklineProduct, finish: string) => void;
}

const ALL_TABS: readonly OaklineCategoryFilter[] = ["All", ...OAKLINE_CATEGORIES];

export function BestSellers({
  activeCategory,
  onSelectCategory,
  onInspectProduct,
  onAddToCart,
}: Props) {
  const visible =
    activeCategory === "All"
      ? oaklineProducts.slice(0, 6)
      : oaklineProducts.filter((p) => p.category === activeCategory);

  return (
    <Section id="oak-products" aria-labelledby="oak-products-title">
      <OakContainer>
        <TopRow>
          <div>
            <span className="eyebrow">Signature Pieces</span>
            <h2 id="oak-products-title">Best-Selling Furniture</h2>
          </div>

          <FilterBar role="group" aria-label="Filter products by category">
            {ALL_TABS.map((cat) => (
              <Pill
                key={cat}
                type="button"
                $active={activeCategory === cat}
                aria-pressed={activeCategory === cat}
                onClick={() => onSelectCategory(cat)}
              >
                {cat}
              </Pill>
            ))}
          </FilterBar>
        </TopRow>

        <Grid>
          {visible.map((product) => (
            <li key={product.id}>
              <Card>
                <MediaBtn
                  type="button"
                  onClick={() => onInspectProduct(product)}
                  aria-label={`View details for ${product.name}`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 94vw"
                  />
                  {product.badge && <Badge>{product.badge}</Badge>}
                </MediaBtn>

                <Body>
                  <span className="cat">{product.category}</span>
                  <h3>{product.name}</h3>
                  <span className="dims">
                    {product.material} · {product.dimensions}
                  </span>

                  <Foot>
                    <strong>{formatOaklinePrice(product.price)}</strong>
                    <BtnRow>
                      <GhostBtn
                        type="button"
                        onClick={() => onInspectProduct(product)}
                        aria-label={`Inspect ${product.name}`}
                      >
                        <Eye size={15} aria-hidden /> Details
                      </GhostBtn>
                      <SolidBtn
                        type="button"
                        onClick={() => onAddToCart(product, product.finishes[0] ?? "Natural White Oak")}
                      >
                        <ShoppingBag size={15} aria-hidden /> Add
                      </SolidBtn>
                    </BtnRow>
                  </Foot>
                </Body>
              </Card>
            </li>
          ))}
        </Grid>
      </OakContainer>
    </Section>
  );
}
