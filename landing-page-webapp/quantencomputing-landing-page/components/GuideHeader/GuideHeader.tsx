import React from "react";
import SectionHeader from "../Section/SectionHeader";
import PortableTextContainer from "../Layout/PortableTextContainer";

interface GuideHeaderProps {
  title: string;
  subtitle: string;
  category: string;
  content_type: string;
  mainImage: string;
}

export default function GuideHeader({
  category,
  content_type,
  subtitle,
  mainImage,
  title,
}: GuideHeaderProps) {
  return (
    <div className={"space-y-8"}>
      <PortableTextContainer>
        <div
          className={
            "flex flex-col items-center text-center space-y-5 px-8 md:px-16"
          }
        >
          <p
            className={"text-grey text-lg"}
          >{`${content_type} • ${category}`}</p>
          <SectionHeader text={title} />
          <p>{subtitle}</p>
        </div>
      </PortableTextContainer>
      <img
        style={{ objectFit: "cover", maxHeight: 300 }}
        className={"w-screen"}
        src={mainImage}
        alt="Divider Image"
      />
    </div>
  );
}
