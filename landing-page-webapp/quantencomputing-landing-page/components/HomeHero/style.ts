import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const BgFade = styled.div(
  (props) => css`
    background: linear-gradient(
      rgba(0, 99, 166, 1) 5%,
      rgba(167, 28, 73, 0.75) 80%
    );
  `
);

const gradient = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
`;

/**
 * If color saturation should be adjusted change rgba(r, g, b, 0.4) to rgba(r, g, b, 0<x<1)
 */
export const MovFade = styled.div(
  (props) => css`
    background: repeating-linear-gradient(
      60deg,
      rgba(0, 99, 166, 0.6) 32%,
      rgba(167, 28, 73, 0.6) 40%,
      rgba(0, 99, 166, 0.6) 48%,
      rgba(167, 28, 73, 0.6) 56%,
      rgba(0, 99, 166, 0.6) 64%
    );
    background-size: 400% 400%;
    animation: ${gradient} 50s linear infinite;
  `
);


export const Gradient = styled.div(
  (props) => css`
    background: linear-gradient(
      rgba(0, 99, 166, 0.2) 0%,
      rgba(0, 99, 166, 1) 100%
    );
  `
);
