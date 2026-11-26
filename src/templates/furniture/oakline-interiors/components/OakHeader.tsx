"use client";

import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { oaklineNav } from "../data/oakline-data";
import { oaklineTheme as t, oakMedia } from "../styles/theme";
import { OakContainer } from "./OakContainer";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(250, 246, 240, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid ${t.colors.border};
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${t.layout.headerHeight};
  gap: 1rem;
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  min-height: 44px;
  font-family: ${t.fonts.display};
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;

  ${oakMedia.tablet} {
    font-size: 1.5rem;
  }
`;

const DesktopNav = styled.nav`
  display: none;
  ${oakMedia.desktop} {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  a {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0.5rem 0;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    color: ${t.colors.umber};
    transition: color ${t.transitions.base};
  }

  a::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1.5px;
    background: ${t.colors.oak};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${t.transitions.base};
  }

  a:hover {
    color: ${t.colors.espresso};
  }

  a:hover::after {
    transform: scaleX(1);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const CartBtn = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0 0.875rem;
  border: 1px solid ${t.colors.border};
  border-radius: ${t.radii.pill};
  background: ${t.colors.white};
  font-size: 0.875rem;
  font-weight: 500;
  transition: border-color ${t.transitions.base};

  &:hover {
    border-color: ${t.colors.espresso};
  }
`;

const CountPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 0.35rem;
  border-radius: ${t.radii.pill};
  background: ${t.colors.oak};
  color: ${t.colors.white};
  font-size: 0.75rem;
  font-weight: 700;
`;

const MenuBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-right: -8px;
  border: 0;
  background: transparent;
  ${oakMedia.desktop} {
    display: none;
  }
`;

const MobileDrawer = styled(motion.div)`
  overflow: hidden;
  background: ${t.colors.cream};
  border-top: 1px solid ${t.colors.border};
  ${oakMedia.desktop} {
    display: none;
  }
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0 1.5rem;

  a {
    display: flex;
    align-items: center;
    min-height: 54px;
    font-family: ${t.fonts.display};
    font-size: 1.375rem;
    font-weight: 600;
    border-bottom: 1px solid ${t.colors.border};
  }
`;

interface Props {
  cartCount: number;
  onOpenCart: () => void;
}

export function OakHeader({ cartCount, onOpenCart }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <Bar>
      <OakContainer>
        <Inner>
          <Brand href="#oak-top" aria-label="Oakline Interiors home">
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden>
              <rect x="2" y="2" width="24" height="24" rx="4" stroke="#9E6B43" strokeWidth="1.75" />
              <path d="M9 20V8h10v12M9 14h10" stroke="#1E1B18" strokeWidth="1.75" />
            </svg>
            Oakline
          </Brand>

          <DesktopNav aria-label="Oakline navigation">
            {oaklineNav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </DesktopNav>

          <Actions>
            <CartBtn
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping bag, ${cartCount} items`}
            >
              <ShoppingBag size={17} aria-hidden />
              <span>Bag</span>
              <CountPill>{cartCount}</CountPill>
            </CartBtn>

            <MenuBtn
              type="button"
              aria-label={open ? "Close showroom menu" : "Open showroom menu"}
              aria-expanded={open}
              aria-controls="oakline-mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </MenuBtn>
          </Actions>
        </Inner>
      </OakContainer>

      <AnimatePresence>
        {open && (
          <MobileDrawer
            id="oakline-mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <OakContainer>
              <MobileNav aria-label="Oakline mobile navigation">
                {oaklineNav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </MobileNav>
            </OakContainer>
          </MobileDrawer>
        )}
      </AnimatePresence>
    </Bar>
  );
}
