"use client";

import { useState } from "react";
import { X } from "lucide-react";
import styled from "styled-components";
import { oaklineTheme as t } from "../styles/theme";
import { OakContainer } from "./OakContainer";

const Bar = styled.div`
  background: ${t.colors.walnut};
  color: ${t.colors.cream};
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
  line-height: 1.35;

  a {
    color: ${t.colors.cream};
    text-decoration: underline;
    text-underline-offset: 3px;
    margin-left: 0.35rem;
    font-weight: 500;
  }
`;

const Close = styled.button`
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
  color: rgba(250, 246, 240, 0.75);

  &:hover {
    color: ${t.colors.white};
  }
`;

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <Bar role="region" aria-label="Showroom announcement">
      <OakContainer>
        <Inner>
          <span>
            Complimentary white-glove delivery on orders over ₹45,000 ·{" "}
            <a href="#oak-collections">Explore New Collections</a>
          </span>
          <Close
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setVisible(false)}
          >
            <X size={15} aria-hidden />
          </Close>
        </Inner>
      </OakContainer>
    </Bar>
  );
}
