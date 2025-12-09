"use client"

import { motion, type MotionProps, type Variants } from "motion/react";
import React, { type JSX, type ReactNode } from "react";

const container: Variants = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const child: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};

type Para = MotionProps &
  React.HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    as?: keyof JSX.IntrinsicElements;
  };

function ChildrenFadeAni({ children, as='div', ...props }: Para) {
  const MotionComponent = motion[as as never] as typeof motion.div;
  return (
    <MotionComponent
      variants={container}
      initial="visible"
      {...props}
    >
      {React.Children.map(children, (element, index) => (
        <motion.div
          variants={child}
          initial="hidden"
          animate="visible"
          key={index}
        >
          {element}
        </motion.div>
      ))}
    </MotionComponent>
  );
}

export default ChildrenFadeAni;
