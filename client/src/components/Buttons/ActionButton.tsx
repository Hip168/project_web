import { motion, type MotionProps } from "motion/react";

type Para = MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  colorOnHover?: string | undefined;
}

const ActionButton = ({ children, colorOnHover, className, ...props }: Para) => {
  return (
    <motion.button
      className={`${colorOnHover && "cursor-pointer"} ${className}`}
      whileHover={colorOnHover && { scale: 1.05, backgroundColor: colorOnHover }}
      whileTap={colorOnHover && { scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default ActionButton;