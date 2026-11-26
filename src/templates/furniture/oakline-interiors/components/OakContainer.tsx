"use client";

import styled from "styled-components";
import { oaklineTheme as t, oakMedia } from "../styles/theme";

export const OakContainer = styled.div`
  width: 100%;
  max-width: ${t.layout.maxWidth};
  margin-inline: auto;
  padding-inline: 1.25rem;

  ${oakMedia.tablet} {
    padding-inline: 2rem;
  }

  ${oakMedia.desktop} {
    padding-inline: 2.5rem;
  }
`;
