import React from "react";
import { motion } from "framer-motion";

interface ToggleButtonProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PathProps {
  d?: string;
  transition?: {
    duration: number;
  };
  variants: {
    closed: {
      d?: string;
      opacity?: number;
    };
    open: {
      d?: string;
      opacity?: number;
    };
  };
}

export default function ToggleButton({ setOpen, isOpen }: ToggleButtonProps) {
  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className="lg:hidden flex justify-center items-center rounded-full bg-primary h-10 w-10 z-40"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="mobile-menu-button rounded"
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <Path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
          />
        </svg>
      </button>
    </motion.div>
  );
}

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 100%)"
    strokeLinecap="round"
    initial={false}
    {...props}
  />
);
