"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import styled from "styled-components";
import { formatTimberPrice, type TimberProduct } from "../data/timber-data";
import { timberTheme as t } from "../styles/theme";

export interface TimberCartItem {
  product: TimberProduct;
  finish: string;
  quantity: number;
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 95;
  display: flex;
  justify-content: flex-end;
  background: rgba(10, 11, 10, 0.72);
  backdrop-filter: blur(5px);
`;

const Drawer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 440px;
  height: 100%;
  background: ${t.colors.bg};
  border-left: 1px solid ${t.colors.borderStrong};
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
    color: ${t.colors.text};
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
  color: ${t.colors.muted};

  h3 {
    margin-top: 1rem;
    color: ${t.colors.text};
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
  background: ${t.colors.card};

  img {
    object-fit: cover;
  }
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h3 {
    font-size: 1.0625rem;
  }

  .finish {
    font-size: 0.8125rem;
    color: ${t.colors.muted};
  }

  .price {
    font-weight: 600;
    font-size: 0.9375rem;
    color: ${t.colors.accent};
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
  border: 1px solid ${t.colors.borderStrong};
  border-radius: ${t.radii.pill};
  background: ${t.colors.bgSecondary};

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
  color: ${t.colors.muted};

  &:hover {
    color: ${t.colors.text};
  }
`;

const Foot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.25rem 1.5rem 1.5rem;
  background: ${t.colors.bgSecondary};
  border-top: 1px solid ${t.colors.border};
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.25rem;

  span {
    color: ${t.colors.muted};
    font-size: 0.9375rem;
  }

  strong {
    font-family: ${t.fonts.serif};
    font-size: 1.625rem;
  }
`;

const PrimaryBtn = styled.button`
  width: 100%;
  min-height: 48px;
  border: 0;
  border-radius: ${t.radii.pill};
  background: ${t.colors.accent};
  color: ${t.colors.bg};
  font-weight: 700;
  font-size: 0.9375rem;

  &:hover {
    background: ${t.colors.accentHover};
  }
`;

const WhatsAppBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  min-height: 48px;
  border: 1px solid ${t.colors.borderStrong};
  border-radius: ${t.radii.pill};
  background: transparent;
  color: ${t.colors.text};
  font-weight: 600;
  font-size: 0.875rem;

  &:hover {
    border-color: ${t.colors.accent};
  }
`;

const Confirm = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: ${t.radii.md};
  background: ${t.colors.card};
  border: 1px solid ${t.colors.accent};
  font-size: 0.9rem;

  svg {
    color: ${t.colors.accent};
    flex-shrink: 0;
    margin-top: 2px;
  }

  p {
    margin-top: 0.25rem;
    color: ${t.colors.muted};
  }
`;

interface Props {
  open: boolean;
  items: readonly TimberCartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, finish: string, delta: number) => void;
  onRemove: (id: string, finish: string) => void;
  onClear: () => void;
}

export function TimberCartDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemove,
  onClear,
}: Props) {
  const [confirmationMode, setConfirmationMode] = useState<"checkout" | "whatsapp" | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Backdrop onClick={onClose} role="presentation">
      <Drawer
        role="dialog"
        aria-modal="true"
        aria-label="Timber and Loom Bag"
        onClick={(e) => e.stopPropagation()}
      >
        <Head>
          <h2>Atelier Selection</h2>
          <button type="button" aria-label="Close bag" onClick={onClose}>
            <X size={20} aria-hidden />
          </button>
        </Head>

        <Body>
          {confirmationMode && items.length === 0 ? (
            <Confirm role="status">
              <CheckCircle2 size={20} aria-hidden />
              <div>
                <strong>
                  {confirmationMode === "whatsapp"
                    ? "WhatsApp Concierge Summary Ready (Demo)"
                    : "Atelier Demo Order Confirmed"}
                </strong>
                <p>
                  {confirmationMode === "whatsapp"
                    ? "Your selected timber finishes and piece dimensions are prepared for our concierge team."
                    : "This demo storefront confirms your selection without charging payment."}
                </p>
              </div>
            </Confirm>
          ) : items.length === 0 ? (
            <Empty>
              <ShoppingBag size={36} aria-hidden />
              <h3>Your selection is empty</h3>
              <p>Add smoked timber or handloom pieces to prepare a consultation or demo order.</p>
            </Empty>
          ) : (
            <ul>
              {items.map(({ product, finish, quantity }) => (
                <Item key={`${product.id}-${finish}`}>
                  <Thumb>
                    <Image src={product.image} alt={product.name} fill sizes="80px" />
                  </Thumb>
                  <Meta>
                    <h3>{product.name}</h3>
                    <span className="finish">{finish}</span>
                    <span className="price">{formatTimberPrice(product.price * quantity)}</span>
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
                  </Meta>
                </Item>
              ))}
            </ul>
          )}
        </Body>

        {items.length > 0 && !confirmationMode && (
          <Foot>
            <TotalRow>
              <span>Estimated Total</span>
              <strong>{formatTimberPrice(subtotal)}</strong>
            </TotalRow>
            <PrimaryBtn
              type="button"
              onClick={() => {
                setConfirmationMode("checkout");
                onClear();
              }}
            >
              Complete Demo Order
            </PrimaryBtn>
            <WhatsAppBtn
              type="button"
              onClick={() => {
                setConfirmationMode("whatsapp");
                onClear();
              }}
            >
              <MessageCircle size={16} aria-hidden /> Enquire via WhatsApp (Demo)
            </WhatsAppBtn>
          </Foot>
        )}
      </Drawer>
    </Backdrop>
  );
}

