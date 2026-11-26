"use client";

import styled from "styled-components";
import { media } from "@/styles/theme";

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin-inline: auto;
  padding-inline: 1.25rem;

  ${media.tablet} { padding-inline: 2rem; }
  ${media.desktop} { padding-inline: 2.5rem; }
`;

