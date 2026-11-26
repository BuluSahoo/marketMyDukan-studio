"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

const Block = styled(motion.div)`
  height: 100%;
`;

/** Subtle fade/slide-in on scroll. Motion is disabled automatically for reduced-motion users (MotionConfig). */
export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <Block
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Block>
  );
}

