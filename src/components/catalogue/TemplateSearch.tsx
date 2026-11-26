"use client";

import { Search, X } from "lucide-react";
import styled from "styled-components";

const Wrap = styled.div`
  position: relative;
  width: 100%;
`;

const IconWrap = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  color: ${({ theme }) => theme.colors.muted};
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  min-height: 48px;
  padding: 0.75rem 3rem 0.75rem 2.75rem;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text};
    box-shadow: 0 0 0 3px rgba(231, 163, 62, 0.25);
  }
`;

const ClearBtn = styled.button`
  position: absolute;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: color ${({ theme }) => theme.transitions.base};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TemplateSearch({
  value,
  onChange,
  placeholder = "Search templates by name or keyword...",
}: Props) {
  return (
    <Wrap>
      <label htmlFor="template-search" className="sr-only">
        Search website templates
      </label>
      <IconWrap aria-hidden>
        <Search size={18} />
      </IconWrap>
      <Input
        id="template-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <ClearBtn
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
        >
          <X size={18} aria-hidden />
        </ClearBtn>
      )}
    </Wrap>
  );
}
