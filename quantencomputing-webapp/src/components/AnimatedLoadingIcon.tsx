import React, { useLayoutEffect } from "react";
import { motion, useCycle } from "framer-motion";

export default function AnimatedLoadingIcon() {
  const [animateTopDown, cycleTopDown] = useCycle(
    { y: 50, transition: { duration: 1.2 } },
    { y: 0, transition: { duration: 1.2 } }
  );

  const [animateBottomUp, cycleBottomUp] = useCycle(
    { y: -45, transition: { duration: 1.2 } },
    { y: 10, transition: { duration: 1.2 } }
  );

  useLayoutEffect(() => {
    const i = setInterval(() => {
      cycleTopDown();
      cycleBottomUp();
    }, 1200);
    return () => clearInterval(i);
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="102"
      height="90"
      viewBox="0 0 102 90"
      fill="none"
    >
      <g id="Group 443">
        <rect
          id="Rectangle 427"
          y="7"
          width="27"
          height="75"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <rect
          id="Rectangle 428"
          x="27"
          y="7"
          width="28"
          height="75"
          rx="14"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUp}
          transition={{ repeat: Infinity }}
          id="load-rect-bottom-2"
          x="40"
          y="45"
          width="27"
          height="40"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateTopDown}
          transition={{ repeat: Infinity }}
          id="load-rect-top-2"
          x="28"
          width="27"
          height="40"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateTopDown}
          transition={{ repeat: Infinity }}
          id="load-rect-top-1"
          x="75"
          y="9"
          width="27"
          height="31"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <rect
          id="Rectangle 430"
          x="75"
          y="20"
          width="27"
          height="65"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <rect
          id="Rectangle 299"
          x="55"
          y="12"
          width="27"
          height="66"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUp}
          transition={{ repeat: Infinity }}
          id="load-rect-bottom-1"
          y="45"
          width="27"
          height="31"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
      </g>
    </svg>
  );
}
