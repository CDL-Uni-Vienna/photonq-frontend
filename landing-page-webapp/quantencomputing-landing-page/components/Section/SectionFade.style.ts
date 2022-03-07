import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { mq } from "../../utils/breakpoints";

export const GradientStyle = styled.div(
  (props) => css`
    .backGroundFade {
      background: linear-gradient(to bottom, #0063a6 73%, rgba(0, 0, 0, 0) 93%);

      ${mq[0]} {
        background: linear-gradient(
          to bottom,
          #0063a6 45%,
          rgba(0, 0, 0, 0) 75%
        );
      }
      ${mq[1]} {
        background: linear-gradient(
          to bottom,
          #0063a6 40%,
          rgba(0, 0, 0, 0) 70%
        );
      }
      ${mq[3]} {
        background: linear-gradient(
          to right,
          #0063a6 52.5%,
          rgba(0, 0, 0, 0) 75%
        );
      }
    }
    .image {
      z-index: -1;
    }
  `
);
