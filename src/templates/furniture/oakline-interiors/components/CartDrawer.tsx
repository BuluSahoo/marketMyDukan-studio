"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import styled from "styled-components";
import { formatOaklinePrice, type OaklineProduct } from "../data/oakline-data";
import { oaklineTheme as t } from "../styles/theme";

export interface CartItem {
  product: OaklineProduct;
  finish: string;
  quantity: number;
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 95;
  display: flex;
  justify-content: flex-end;
  background: rgba(30, 27, 24, 0.5);
  backdrop-filter: blur(4px);
`;

const Drawer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 440px;
  height: 100%;
  background: ${t.colors.cream};
  box-shadow: -12px 0 40px rgba(30, 27, 24, 0.16);
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${t.colors.border};

  h2 {
    font-size: 1.5rem;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 0;
    background: transparent;
  }
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 1rem;
  color: ${t.colors.umber};

  h3 {
    margin-top: 1rem;
    color: ${t.colors.espresso};
    font-size: 1.375rem;
  }
  p {
    margin-top: 0.5rem;
    font-size: 0.9375rem;
  }
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${t.colors.border};
`;

const Thumb = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: ${t.radii.sm};
  overflow: hidden;
  background: ${t.colors.linen};

  img {
    object-fit: cover;
  }
`;

const ItemMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h3 {
    font-size: 1.0625rem;
  }

  .finish {
    font-size: 0.8125rem;
    color: ${t.colors.umber};
  }

  .price {
    font-weight: 600;
    font-size: 0.9375rem;
  }
`;

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const Stepper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${t.colors.border};
  border-radius: ${t.radii.pill};
  background: ${t.colors.white};

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 0;
    background: transparent;
  }

  span {
    min-width: 24px;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 600;
  }
`;

const RemoveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 0;
  background: transparent;
  color: ${t.colors.umber};
  &:hover {
    color: ${t.colors.espresso};
  }
`;

const Foot = styled.div`
  padding: 1.25rem 1.5rem 1.5rem;
  background: ${t.colors.white};
  border-top: 1px solid ${t.colors.border};
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;

  span {
    color: ${t.colors.umber};
    font-size: 0.9375rem;
  }

  strong {
    font-family: ${t.fonts.display};
    font-size: 1.625rem;
  }
`;

const Note = styled.p`
  font-size: 0.8125rem;
  color: ${t.colors.sage};
  margin-bottom: 1rem;
`;

const SubmitBtn = styled.button`
  width: 100%;
  min-height: 50px;
  border: 0;
  border-radius: ${t.radii.pill};
  background: ${t.colors.espresso};
  color: ${t.colors.white};
  font-weight: 600;
  font-size: 0.9375rem;

  &:hover {
    background: ${t.colors.oak};
  }
`;

const ConfirmBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.875rem 1rem;
  border-radius: ${t.radii.sm};
  background: ${t.colors.linen};
  font-size: 0.875rem;

  svg {
    color: ${t.colors.sage};
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

interface Props {
  open: boolean;
  items: readonly CartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, finish: string, delta: number) => void;
  onRemove: (id: string, finish: string) => void;
  onClear: () => void;
}

export function CartDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemove,
  onClear,
}: Props) {
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const showConfirmation = requested && items.length === 0;

  return (
    <Backdrop onClick={onClose} role="presentation">
      <Drawer
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
        onClick={(e) => e.stopPropagation()}
      >
        <Head>
          <h2>Your Bag</h2>
          <button type="button" aria-label="Close bag" onClick={onClose}>
            <X size={20} aria-hidden />
          </button>
        </Head>

        <Body>
          {showConfirmation ? (
            <ConfirmBox role="status">
              <CheckCircle2 size={20} aria-hidden />
              <div>
                <strong>Showroom Enquiry Recorded (Demo)</strong>
                <p>
                  This interactive demo confirms your selection without processing payment. Our
                  concierge would confirm delivery timelines and wood samples next.
                </p>
              </div>
            </ConfirmBox>
          ) : items.length === 0 ? (
            <Empty>
              <ShoppingBag size={36} aria-hidden />
              <h3>Your bag is empty</h3>
              <p>Select a handcrafted oak piece to preview your showroom order summary.</p>
            </Empty>
          ) : (
            <ul>
              {items.map(({ product, finish, quantity }) => (
                <Item key={`${product.id}-${finish}`}>
                  <Thumb>
                    <Image src={product.image} alt={product.name} fill sizes="80px" />
                  </Thumb>
                  <ItemMeta>
                    <h3>{product.name}</h3>
                    <span className="finish">{finish}</span>
                    <span className="price">{formatOaklinePrice(product.price * quantity)}</span>
                    <QtyRow>
                      <Stepper>
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${product.name}`}
                          onClick={() => onUpdateQty(product.id, finish, -1)}
                        >
                          <Minus size={14} aria-hidden />
                        </button>
                        <span>{quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => onUpdateQty(product.id, finish, 1)}
                        >
                          <Plus size={14} aria-hidden />
                        </button>
                      </Stepper>
                      <RemoveBtn
                        type="button"
                        aria-label={`Remove ${product.name}`}
                        onClick={() => onRemove(product.id, finish)}
                      >
                        <Trash2 size={16} aria-hidden />
                      </RemoveBtn>
                    </QtyRow>
                  </ItemMeta>
                </Item>
              ))}
            </ul>
          )}
        </Body>

        {items.length > 0 && !requested && (
          <Foot>
            <TotalRow>
              <span>Estimated Subtotal</span>
              <strong>{formatOaklinePrice(subtotal)}</strong>
            </TotalRow>
            <Note>
              {subtotal >= 45000
                ? "Eligible for complimentary white-glove delivery."
                : `Add ${formatOaklinePrice(45000 - subtotal)} more for complimentary white-glove delivery.`}
            </Note>
            <SubmitBtn
              type="button"
              onClick={() => {
                setRequested(true);
                onClear();
              }}
            >
              Request Showroom Order (Demo)
            </SubmitBtn>
          </Foot>
        )}
      </Drawer>
    </Backdrop>
  );
}
