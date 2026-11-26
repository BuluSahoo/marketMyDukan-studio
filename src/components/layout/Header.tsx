"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import styled from "styled-components";
import { siteConfig } from "@/config/site";
import { media } from "@/styles/theme";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(247, 246, 242, 0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.layout.headerHeight};
`;

const DesktopNav = styled.nav`
  display: none;
  ${media.desktop} {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  ${media.wide} { gap: 2rem; }
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  position: relative;
  font-size: 0.9375rem;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.muted)};
  padding: 0.75rem 0;
  transition: color ${({ theme }) => theme.transitions.base};

  &::after {
    content: "";
    position: absolute;
    left: 0; right: 0; bottom: 2px;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left;
    transition: transform ${({ theme }) => theme.transitions.base};
  }
  &:hover { color: ${({ theme }) => theme.colors.text}; }
  &:hover::after { transform: scaleX(1); }
`;

const DesktopCta = styled.div`
  display: none;
  ${media.desktop} { display: block; }
`;

const Toggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-right: -8px;
  border: 0;
  background: transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  ${media.desktop} { display: none; }
`;

const MobilePanel = styled(motion.div)`
  overflow: hidden;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  ${media.desktop} { display: none; }
`;

const MobileList = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0 1.5rem;
`;

const MobileLink = styled(Link)`
  display: flex;
  align-items: center;
  min-height: 56px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const MobileCta = styled.div`
  padding-top: 1.25rem;
`;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/templates") return pathname.startsWith("/templates");
    return false;
  };

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

  const close = () => setOpen(false);

  return (
    <Bar>
      <Container>
        <Inner>
          <Logo />
          <DesktopNav aria-label="Primary">
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  $active={active}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </DesktopNav>
          <DesktopCta>
            <ButtonLink href={siteConfig.cta.href}>{siteConfig.cta.label}</ButtonLink>
          </DesktopCta>
          <Toggle
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </Toggle>
        </Inner>
      </Container>
      <AnimatePresence>
        {open && (
          <MobilePanel
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Container>
              <MobileList aria-label="Mobile">
                {siteConfig.nav.map((item) => (
                  <MobileLink key={item.href} href={item.href} onClick={close}>
                    {item.label}
                  </MobileLink>
                ))}
                <MobileCta>
                  <ButtonLink href={siteConfig.cta.href} block onClick={close}>
                    {siteConfig.cta.label}
                  </ButtonLink>
                </MobileCta>
              </MobileList>
            </Container>
          </MobilePanel>
        )}
      </AnimatePresence>
    </Bar>
  );
}

