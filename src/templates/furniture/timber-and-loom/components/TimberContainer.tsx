"use client";

import styled from "styled-components";
import { timberMedia, timberTheme as t } from "../styles/theme";

export const TimberContainer = styled.div`
  width: 100%;
  max-width: ${t.layout.maxWidth};
  margin-inline: auto;
  padding-inline: 1.25rem;

  ${timberMedia.tablet} {
    padding-inline: 2rem;
  }

  ${timberMedia.desktop} {
    padding-inline: 3rem;
  }
`;

