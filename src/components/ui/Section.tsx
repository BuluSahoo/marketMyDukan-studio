"use client";

import styled from "styled-components";
import { media } from "@/styles/theme";

type Tone = "default" | "white" | "dark";

export const Section = styled.section<{ $tone?: Tone }>`
  padding: 4.5rem 0;
  background: ${({ $tone, theme }) =>
    $tone === "white" ? theme.colors.card : $tone === "dark" ? theme.colors.text : "transparent"};
  color: ${({ $tone, theme }) => ($tone === "dark" ? theme.colors.card : "inherit")};
  border-top: ${({ $tone, theme }) => ($tone === "white" ? `1px solid ${theme.colors.border}` : "0")};
  border-bottom: ${({ $tone, theme }) => ($tone === "white" ? `1px solid ${theme.colors.border}` : "0")};
  scroll-margin-top: ${({ theme }) => theme.layout.headerHeight};

  ${media.tablet} { padding: 6rem 0; }
  ${media.desktop} { padding: 7.5rem 0; }
`;

