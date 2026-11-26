"use client";

import { RotateCcw, SearchX } from "lucide-react";
import styled from "styled-components";
import { media } from "@/styles/theme";
import { Button, ButtonLink } from "@/components/ui/Button";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3.5rem 1.5rem;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};

  ${media.tablet} {
    padding: 5rem 2rem;
  }

  h2 {
    margin-top: 1.25rem;
    font-size: 1.5rem;
  }

  p {
    max-width: 38ch;
    margin-top: 0.625rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(231, 163, 62, 0.16);
  color: ${({ theme }) => theme.colors.text};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.75rem;
  width: 100%;
  max-width: 22rem;

  ${media.tablet} {
    flex-direction: row;
    justify-content: center;
    max-width: none;
    width: auto;
  }
`;

interface Props {
  title?: string;
  description?: string;
  onReset: () => void;
  showBrowseAll?: boolean;
}

export function EmptyState({
  title = "No matching templates found",
  description = "Try clearing your search or switching website type filters to see more designs.",
  onReset,
  showBrowseAll = false,
}: Props) {
  return (
    <Box role="status" aria-live="polite">
      <IconWrap aria-hidden>
        <SearchX size={28} />
      </IconWrap>
      <h2>{title}</h2>
      <p>{description}</p>
      <Actions>
        <Button onClick={onReset}>
          <RotateCcw size={16} aria-hidden /> Reset Filters
        </Button>
        {showBrowseAll && (
          <ButtonLink href="/templates" variant="secondary">
            View All Templates
          </ButtonLink>
        )}
      </Actions>
    </Box>
  );
}

