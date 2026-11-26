"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

type Variant = "primary" | "secondary";

const base = css<{ $variant: Variant; $block?: boolean }>`
  display: ${({ $block }) => ($block ? "flex" : "inline-flex")};
  width: ${({ $block }) => ($block ? "100%" : "auto")};
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;
  padding: 0 1.5rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 0.9375rem;
  line-height: 1;
  white-space: nowrap;
  border: 1px solid transparent;
  transition:
    background ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};

  ${({ $variant, theme }) =>
    $variant === "primary"
      ? css`
          background: ${theme.colors.accent};
          color: ${theme.colors.text};
          &:hover { background: ${theme.colors.accentHover}; }
        `
      : css`
          background: transparent;
          color: ${theme.colors.text};
          border-color: ${theme.colors.text};
          &:hover { background: ${theme.colors.text}; color: ${theme.colors.card}; }
        `}

  &:active { transform: scale(0.97); }
`;

const StyledLink = styled(Link)<{ $variant: Variant; $block?: boolean }>`
  ${base}
`;

const StyledButton = styled.button<{ $variant: Variant; $block?: boolean }>`
  ${base}
`;

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  block?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

export function ButtonLink({ href, children, variant = "primary", block, onClick, ariaLabel }: ButtonLinkProps) {
  return (
    <StyledLink href={href} $variant={variant} $block={block} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </StyledLink>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  block?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  ariaLabel?: string;
}

export function Button({
  children,
  variant = "primary",
  block,
  type = "button",
  onClick,
  ariaLabel,
}: ButtonProps) {
  return (
    <StyledButton type={type} $variant={variant} $block={block} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </StyledButton>
  );
}
