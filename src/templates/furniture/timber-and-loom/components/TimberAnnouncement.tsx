"use client";

import { useState } from "react";
import { X } from "lucide-react";
import styled from "styled-components";
import { timberTheme as t } from "../styles/theme";
import { TimberContainer } from "./TimberContainer";

const Strip = styled.div`
  background: ${t.colors.bgSecondary};
  border-bottom: 1px solid ${t.colors.border};
  color: ${t.colors.muted};
  font-size: 0.8125rem;
`;

const Inner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0.5rem 2.5rem;
  text-align: center;

  strong {
    color: ${t.colors.accent};
    font-weight: 600;
  }

  a {
    color: ${t.colors.text};
    text-decoration: underline;
    text-underline-offset: 3px;
    margin-left: 0.4rem;
  }
`;

const Dismiss = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
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

export function TimberAnnouncement() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <Strip role="region" aria-label="Studio announcement">
      <TimberContainer>
        <Inner>
          <span>
            <strong>Atelier Edition</strong> · Seasoned Burma Teak &amp; Handloom Wool ·{" "}
            <a href="#tl-promo">Explore Signature Piece</a>
          </span>
          <Dismiss
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setOpen(false)}
          >
            <X size={15} aria-hidden />
          </Dismiss>
        </Inner>
      </TimberContainer>
    </Strip>
  );
}

