import React from "react";

import { GradientStyle } from "./SectionFade.style";

interface SectionContentProps {
  header: string;
  content: string;
  imgSrc: string;
}

//xl:bg-gradient-to-r bg-gradient-to-b from-primary xl:via-primary

export default function SectionContent({
  header,
  content,
  imgSrc: svgSrc,
}: SectionContentProps) {
  return (
    <GradientStyle>
      <div className={"flex"}>
        <div className={"xl:flex space-y-8 md:space-y-0 backGroundFade"}>
          <div
            className={
              "xl:w-8/12 space-y-5 flex flex-col justify-center p-10 ml-10"
            }
          >
            <h3 className={"text-3xl font-bold text-white"}>{header}</h3>
            <p className={"pr-10 text-white text-xl"}>{content}</p>
          </div>
          <div className={"xl:w-6-12 flex justify-center items-center"}>
            <img className={"w-full h-auto image"} src={svgSrc} />
          </div>
        </div>
      </div>
    </GradientStyle>
  );
}
