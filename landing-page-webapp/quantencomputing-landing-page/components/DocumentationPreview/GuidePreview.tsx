import React from "react";
import { GuideDocumentLocalizedPreview } from "../../cms/guide/guide.type";
import Link from "next/link";

interface GuidePreviewProps {
  guide: GuideDocumentLocalizedPreview;
}

export default function GuidePreview({ guide }: GuidePreviewProps) {
  return (
    <Link href={`/how-to-guides/${guide.slug.current}`}>
      <div
        className={
          "relative rounded filter drop-shadow-2xl transform hover:scale-105 duration-300 cursor-pointer"
        }
      >
        <img
          className={"w-full h-full rounded"}
          src={guide.mainImage}
          alt="Content Image"
        />
        <div
          style={{ backgroundColor: "#263238" }}
          className={"absolute inset-0 z-10 opacity-40"}
        />
        <div className={"absolute top-4 right-0 bg-primary-light z-20 px-1"}>
          <p className={"text-primary"}>{guide.content_type}</p>
        </div>
        <div
          className={
            "absolute bottom-0 text-white mx-5 mb-5 z-20 backdrop-filter backdrop-blur-lg rounded p-1"
          }
        >
          <h4 className={"text-lg font-bold"}>{guide.title}</h4>
          <p className={"leading-normal"}>{guide.teaser}</p>
        </div>
      </div>
    </Link>
  );
}
