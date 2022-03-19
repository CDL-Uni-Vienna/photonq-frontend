import React from "react";
import clsx from "clsx";

interface SectionContentProps {
  header: string;
  content: string;
  maxWidthImage?: number;
  imgTopSrc: string;
  imgBotSrc: string;
}

export default function SectionContent({
  header,
  content,
  maxWidthImage,
  imgTopSrc,
  imgBotSrc,
}: SectionContentProps) {
  return (
    <div className={"flex justify-center text-xl"}>
      <div className={"md:flex space-y-8 md:space-y-0 md:space-x-10"}>
        <div
          className={clsx("md:w-6/12 space-y-5 flex flex-col justify-center", {
            ["md:w-8/12"]: maxWidthImage,
          })}
        >
          <h3 className={"text-3xl font-bold"}>{header}</h3>
          <p>{content}</p>
        </div>
        <div
          className={clsx("w-9/12 md:w-4/12 justify-center items-center", {
            ["md:w-4/12"]: maxWidthImage,
          })}
        >
          <img style={{ maxWidth: maxWidthImage }} src={imgTopSrc} />
          <img style={{ maxWidth: maxWidthImage }} src={imgBotSrc} />
        </div>
      </div>
    </div>
  );
}
