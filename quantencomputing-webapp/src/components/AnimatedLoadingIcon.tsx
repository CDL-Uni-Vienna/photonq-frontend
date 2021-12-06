import React, { useLayoutEffect } from "react";
import { motion, useCycle } from "framer-motion";

export default function AnimatedLoadingIcon() {
  const [animateBottomUpBigRect, cycleAnimateBottomUpBigRect] = useCycle(
    { y: 100, opacity: 1, transition: { duration: 0 } },
    { y: 0, opacity: 0, transition: { duration: 1.2, repeat: Infinity } }
  );

  const [animateBottomUp, cycleBottomUp] = useCycle(
    { y: 100, opacity: 1, transition: { duration: 0 } },
    {
      y: 0,
      opacity: 0,
      transition: { duration: 1, delay: 0.2, repeat: Infinity },
    }
  );

  const [animateBottomUpBigRect2, cycleAnimateBottomUpBigRect2] = useCycle(
    { y: 100, opacity: 1, transition: { duration: 0 } },
    { y: 0, opacity: 0, transition: { duration: 1.2, repeat: Infinity } }
  );

  const [animateBottomUp2, cycleBottomUp2] = useCycle(
    { y: 100, opacity: 1, transition: { duration: 0 } },
    {
      y: 0,
      opacity: 0,
      transition: { duration: 1, delay: 0.2, repeat: Infinity },
    }
  );

  useLayoutEffect(() => {
    setTimeout(() => {
      cycleAnimateBottomUpBigRect();
      cycleBottomUp();
    }, 200);
    setTimeout(() => {
      cycleAnimateBottomUpBigRect2();
      cycleBottomUp2();
    }, 800);

    // eslint-disable-next-line
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="102"
      height="100"
      viewBox="0 0 102 100"
      fill="none"
    >
      <motion.g id="Group 443">
        <motion.rect
          animate={animateBottomUpBigRect}
          id="Rectangle 427"
          y="10"
          width="27"
          height="75"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUpBigRect}
          id="Rectangle 428"
          x="27"
          y="-10"
          width="28"
          height="75"
          rx="14"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUp}
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
          animate={animateBottomUp}
          id="load-rect-top-2"
          x="28"
          width="27"
          height="40"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUp}
          id="load-rect-top-1"
          x="75"
          y="26"
          width="27"
          height="31"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUpBigRect}
          id="Rectangle 430"
          x="75"
          y="20"
          width="27"
          height="65"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUpBigRect}
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
          id="load-rect-bottom-1"
          y="45"
          width="27"
          height="31"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUpBigRect2}
          y="0"
          width="27"
          height="75"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUpBigRect2}
          x="27"
          y="15"
          width="28"
          height="75"
          rx="14"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUp2}
          x="40"
          y="45"
          width="27"
          height="40"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUp2}
          x="28"
          width="27"
          height="40"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUp2}
          x="75"
          y="-10"
          width="27"
          height="31"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUpBigRect2}
          x="75"
          y="20"
          width="27"
          height="65"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUpBigRect2}
          x="55"
          y="-22"
          width="27"
          height="66"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
        <motion.rect
          animate={animateBottomUp2}
          y="45"
          width="27"
          height="31"
          rx="13.5"
          fill="#FAFAFA"
          fillOpacity="0.47"
        />
      </motion.g>
    </svg>
  );
}
