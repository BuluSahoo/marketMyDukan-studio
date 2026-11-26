"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Ruler, ShieldCheck, ShoppingBag, X } from "lucide-react";
import styled, { css } from "styled-components";
import { formatOaklinePrice, type OaklineProduct } from "../data/oakline-data";
import { oaklineTheme as t, oakMedia } from "../styles/theme";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(30, 27, 24, 0.58);
  backdrop-filter: blur(6px);
  overflow-y: auto;
`;

const Dialog = styled.div`
  position: relative;
  width: 100%;
  max-width: 960px;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  background: ${t.colors.cream};
  border-radius: ${t.radii.md};
  box-shadow: ${t.shadows.elevated};
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid ${t.colors.border};
  border-radius: ${t.radii.pill};
  background: ${t.colors.white};
  color: ${t.colors.espresso};
`;

const Grid = styled.div`
  display: grid;
  ${oakMedia.desktop} {
    grid-template-columns: 1.05fr 1fr;
  }
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  background: ${t.colors.linen};
  ${oakMedia.desktop} {
    aspect-ratio: auto;
    min-height: 480px;
  }

  img {
    object-fit: cover;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  ${oakMedia.tablet} {
    padding: 2.25rem;
  }

  .category {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${t.colors.oak};
  }

  h2 {
    margin-top: 0.5rem;
    font-size: 1.875rem;
    padding-right: 2.5rem;
  }

  .price {
    margin-top: 0.75rem;
    font-size: 1.375rem;
    font-weight: 600;
  }

  .desc {
    margin-top: 1rem;
    color: ${t.colors.umber};
    font-size: 0.9375rem;
  }
`;

const FinishGroup = styled.div`
  margin-top: 1.5rem;

  span.label {
    display: block;
    font-size: 0.8125rem;
    font-weight: 600;
    margin-bottom: 0.625rem;
  }
`;

const FinishRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FinishBtn = styled.button<{ $active: boolean }>`
  min-height: 44px;
  padding: 0 1rem;
  border-radius: ${t.radii.pill};
  font-size: 0.8125rem;
  font-weight: 500;
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
          color: ${t.colors.espresso};
          border-color: ${t.colors.border};
        `}
`;

const Specs = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid ${t.colors.border};
  border-bottom: 1px solid ${t.colors.border};
  font-size: 0.875rem;
  color: ${t.colors.umber};

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  svg {
    color: ${t.colors.oak};
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const AddBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  min-height: 52px;
  margin-top: 1.5rem;
  padding: 0 1.5rem;
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

interface Props {
  product: OaklineProduct | null;
  onClose: () => void;
  onAddToCart: (product: OaklineProduct, finish: string) => void;
}

export function ProductDetailModal({ product, onClose, onAddToCart }: Props) {
  const [selectedFinish, setSelectedFinish] = useState(product?.finishes[0] ?? "Natural White Oak");

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <Backdrop onClick={onClose} role="presentation">
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="oak-product-title"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseBtn type="button" aria-label="Close product details" onClick={onClose}>
          <X size={20} aria-hidden />
        </CloseBtn>
        <Grid>
          <Media>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 480px, 95vw"
            />
          </Media>
          <Info>
            <span className="category">{product.category}</span>
            <h2 id="oak-product-title">{product.name}</h2>
            <p className="price">{formatOaklinePrice(product.price)}</p>
            <p className="desc">{product.description}</p>

            <FinishGroup>
              <span className="label">Timber Finish: {selectedFinish}</span>
              <FinishRow role="group" aria-label="Select timber finish">
                {product.finishes.map((finish) => (
                  <FinishBtn
                    key={finish}
                    type="button"
                    $active={selectedFinish === finish}
                    aria-pressed={selectedFinish === finish}
                    onClick={() => setSelectedFinish(finish)}
                  >
                    {finish}
                  </FinishBtn>
                ))}
              </FinishRow>
            </FinishGroup>

            <Specs>
              <li>
                <Ruler size={16} aria-hidden />
                <span>
                  <strong>Dimensions:</strong> {product.dimensions}
                </span>
              </li>
              <li>
                <Check size={16} aria-hidden />
                <span>
                  <strong>Materials:</strong> {product.material}
                </span>
              </li>
              <li>
                <ShieldCheck size={16} aria-hidden />
                <span>
                  <strong>Care:</strong> {product.careNote}
                </span>
              </li>
            </Specs>

            <AddBtn
              type="button"
              onClick={() => {
                onAddToCart(product, selectedFinish);
                onClose();
              }}
            >
              <ShoppingBag size={18} aria-hidden /> Add to Bag — {formatOaklinePrice(product.price)}
            </AddBtn>
          </Info>
        </Grid>
      </Dialog>
    </Backdrop>
  );
}
