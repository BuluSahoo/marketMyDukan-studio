"use client";

import styled, { css } from "styled-components";
import { media } from "@/styles/theme";
import { WEBSITE_TYPES, type WebsiteType } from "@/types/template";

export type TypeFilterValue = "All" | WebsiteType;

const OPTIONS: readonly TypeFilterValue[] = ["All", ...WEBSITE_TYPES];

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.tablet} {
    flex-wrap: wrap;
    overflow-x: visible;
    padding-bottom: 0;
  }
`;

const PillBtn = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 1rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.875rem;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  white-space: nowrap;
  border: 1px solid;
  transition:
    background ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};

  ${({ $active, theme }) =>
    $active
      ? css`
          background: ${theme.colors.accent};
          color: ${theme.colors.text};
          border-color: ${theme.colors.accent};
        `
      : css`
          background: transparent;
          color: ${theme.colors.muted};
          border-color: ${theme.colors.border};
          &:hover {
            color: ${theme.colors.text};
            border-color: ${theme.colors.muted};
          }
        `}
`;

interface Props {
  value: TypeFilterValue;
  onChange: (value: TypeFilterValue) => void;
}

export function TemplateTypeFilter({ value, onChange }: Props) {
  return (
    <Row role="group" aria-label="Filter by website type">
      {OPTIONS.map((option) => {
        const active = value === option;
        return (
          <PillBtn
            key={option}
            type="button"
            $active={active}
            aria-pressed={active}
            onClick={() => onChange(option)}
          >
            {option}
          </PillBtn>
        );
      })}
    </Row>
  );
}

