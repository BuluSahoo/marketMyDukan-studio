"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Clock, Ruler, ShoppingBag, X } from "lucide-react";
import styled, { css } from "styled-components";
import { formatTimberPrice, type TimberProduct } from "../data/timber-data";
import { timberMedia, timberTheme as t } from "../styles/theme";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(10, 11, 10, 0.78);
  backdrop-filter: blur(8px);
  overflow-y: auto;
`;

const Dialog = styled.div`
  position: relative;
  width: 100%;
  max-width: 960px;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  background: ${t.colors.bgSecondary};
  border: 1px solid ${t.colors.borderStrong};
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
  border: 1px solid ${t.colors.borderStrong};
  border-radius: ${t.radii.pill};
  background: ${t.colors.bg};
  color: ${t.colors.text};
`;

const Grid = styled.div`
  display: grid;
  ${timberMedia.desktop} {
    grid-template-columns: 1.05fr 1fr;
  }
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  background: ${t.colors.bg};

  ${timberMedia.desktop} {
    aspect-ratio: auto;
    min-height: 480px;
  }

  img {
    object-fit: cover;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  ${timberMedia.tablet} {
    padding: 2.25rem;
  }

  .cat {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${t.colors.accent};
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
    color: ${t.colors.text};
  }

  .desc {
    margin-top: 1rem;
    font-size: 0.9375rem;
    color: ${t.colors.muted};
  }
`;

const FinishWrap = styled.div`
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

const FinishPill = styled.button<{ $active: boolean }>`
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
          background: ${t.colors.accent};
          color: ${t.colors.bg};
          border-color: ${t.colors.accent};
          font-weight: 600;
        `
      : css`
          background: ${t.colors.card};
          color: ${t.colors.text};
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
  color: ${t.colors.muted};

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  svg {
    color: ${t.colors.accent};
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
  background: ${t.colors.accent};
  color: ${t.colors.bg};
  font-weight: 700;
  font-size: 0.9375rem;
  transition: background ${t.transitions.base};

  &:hover {
    background: ${t.colors.accentHover};
  }
`;

interface Props {
  product: TimberProduct | null;
  onClose: () => void;
  onAddToCart: (product: TimberProduct, finish: string) => void;
}

export function TimberProductModal({ product, onClose, onAddToCart }: Props) {
  const [finish, setFinish] = useState(product?.finishes[0] ?? "Smoked Walnut");

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
        aria-labelledby="tl-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseBtn type="button" aria-label="Close product modal" onClick={onClose}>
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
          <Body>
            <span className="cat">{product.category}</span>
            <h2 id="tl-modal-title">{product.name}</h2>
            <p className="price">{formatTimberPrice(product.price)}</p>
            <p className="desc">{product.details}</p>

            <FinishWrap>
              <span className="label">Finish &amp; Weave: {finish}</span>
              <FinishRow role="group" aria-label="Select finish and weave">
                {product.finishes.map((opt) => (
                  <FinishPill
                    key={opt}
                    type="button"
                    $active={finish === opt}
                    aria-pressed={finish === opt}
                    onClick={() => setFinish(opt)}
                  >
                    {opt}
                  </FinishPill>
                ))}
              </FinishRow>
            </FinishWrap>

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
                  <strong>Materials:</strong> {product.materials}
                </span>
              </li>
              <li>
                <Clock size={16} aria-hidden />
                <span>
                  <strong>Dispatch:</strong> {product.leadTime}
                </span>
              </li>
            </Specs>

            <AddBtn
              type="button"
              onClick={() => {
                onAddToCart(product, finish);
                onClose();
              }}
            >
              <ShoppingBag size={18} aria-hidden /> Add to Bag — {formatTimberPrice(product.price)}
            </AddBtn>
          </Body>
        </Grid>
      </Dialog>
    </Backdrop>
  );
}

