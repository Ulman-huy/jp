"use client";

import clsx from "clsx";
import { domAnimation, LazyMotion, motion, MotionProps } from "framer-motion";

type ButtonProps = {
  variant?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps;

const Button = ({
  children,
  className,
  variant = "secondary",
  ...props
}: ButtonProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        className={clsx(
          "px-4",
          variant === "primary" && "",
          variant === "secondary" && "bg-white/5",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    </LazyMotion>
  );
};

export default Button;
