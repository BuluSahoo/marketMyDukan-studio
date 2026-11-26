"use client";

import { ChevronDown } from "lucide-react";
import styled from "styled-components";
import { media } from "@/styles/theme";
import type { TemplateSortOption } from "@/types/template";

const Wrap = styled.div`
  position: relative;
  width: 100%;
  ${media.tablet} {
    width: auto;
    min-width: 210px;
  }
`;

const Select = styled.select`
  appearance: none;
  width: 100%;
  min-height: 48px;
  padding: 0.75rem 2.75rem 0.75rem 1.125rem;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text};
    box-shadow: 0 0 0 3px rgba(231, 163, 62, 0.25);
  }
`;

const IconWrap = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  color: ${({ theme }) => theme.colors.muted};
  pointer-events: none;
`;

interface Props {
  value: TemplateSortOption;
  onChange: (value: TemplateSortOption) => void;
}

export function TemplateSort({ value, onChange }: Props) {
  return (
    <Wrap>
      <label htmlFor="template-sort" className="sr-only">
        Sort templates
      </label>
      <Select
        id="template-sort"
        value={value}
        onChange={(e) => onChange(e.target.value as TemplateSortOption)}
      >
        <option value="featured">Sort: Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </Select>
      <IconWrap aria-hidden>
        <ChevronDown size={18} />
      </IconWrap>
    </Wrap>
  );
}

