"use client";

import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { timberNav } from "../data/timber-data";
import { timberMedia, timberTheme as t } from "../styles/theme";
import { TimberContainer } from "./TimberContainer";

const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(23, 24, 23, 0.9);
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
  font-family: ${t.fonts.serif};
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${t.colors.text};
  white-space: nowrap;

  ${timberMedia.tablet} {
    font-size: 1.45rem;
  }

  span {
    color: ${t.colors.accent};
    font-style: italic;
  }
`;

const DesktopNav = styled.nav`
  display: none;

  ${timberMedia.desktop} {
    display: flex;
    align-items: center;
    gap: 1.75rem;
  }

  a {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${t.colors.muted};
    transition: color ${t.transitions.base};
  }

  a::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 6px;
    height: 1px;
    background: ${t.colors.accent};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${t.transitions.base};
  }

  a:hover {
    color: ${t.colors.text};
  }

  a:hover::after {
    transform: scaleX(1);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const BagBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0 1rem;
  border: 1px solid ${t.colors.borderStrong};
  border-radius: ${t.radii.pill};
  background: ${t.colors.bgSecondary};
  color: ${t.colors.text};
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  transition: border-color ${t.transitions.base}, background ${t.transitions.base};

  &:hover {
    border-color: ${t.colors.accent};
    background: ${t.colors.card};
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 0.35rem;
  border-radius: ${t.radii.pill};
  background: ${t.colors.accent};
  color: ${t.colors.bg};
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
  color: ${t.colors.text};

  ${timberMedia.desktop} {
    display: none;
  }
`;

const MobileDrawer = styled(motion.div)`
  overflow: hidden;
  background: ${t.colors.bgSecondary};
  border-top: 1px solid ${t.colors.border};

  ${timberMedia.desktop} {
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
    font-family: ${t.fonts.serif};
    font-size: 1.375rem;
    color: ${t.colors.text};
    border-bottom: 1px solid ${t.colors.border};
  }
`;

interface Props {
  cartCount: number;
  onOpenCart: () => void;
}

export function TimberHeader({ cartCount, onOpenCart }: Props) {
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
    <HeaderBar>
      <TimberContainer>
        <Inner>
          <Brand href="#tl-top" aria-label="Timber and Loom home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 7h16M4 17h16M7 4v16M17 4v16" stroke="#B68A5A" strokeWidth="1.5" />
            </svg>
            Timber <span>&amp;</span> Loom
          </Brand>

          <DesktopNav aria-label="Timber and Loom navigation">
            {timberNav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </DesktopNav>

          <Actions>
            <BagBtn
              type="button"
              onClick={onOpenCart}
              aria-label={`Open bag, ${cartCount} items`}
            >
              <ShoppingBag size={16} aria-hidden />
              <span>Bag</span>
              <Badge>{cartCount}</Badge>
            </BagBtn>

            <MenuBtn
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="tl-mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </MenuBtn>
          </Actions>
        </Inner>
      </TimberContainer>

      <AnimatePresence>
        {open && (
          <MobileDrawer
            id="tl-mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <TimberContainer>
              <MobileNav aria-label="Timber and Loom mobile navigation">
                {timberNav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </MobileNav>
            </TimberContainer>
          </MobileDrawer>
        )}
      </AnimatePresence>
    </HeaderBar>
  );
}

