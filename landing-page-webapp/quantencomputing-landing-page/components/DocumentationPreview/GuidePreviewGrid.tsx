import React from "react";
import { GuideDocumentLocalizedPreview } from "../../cms/guide/guide.type";
import GuidePreview from "./GuidePreview";

interface GuidePreviewGridProps {
  guides: GuideDocumentLocalizedPreview[];
}

export default function GuidePreviewGrid({ guides }: GuidePreviewGridProps) {
  return (
    <div
      className={"grid md:grid-cols-3 gap-10 w-full space-y-10 md:space-y-0"}
    >
      {guides.map((guide, index) => (
        <GuidePreview key={index} guide={guide} />
      ))}
    </div>
  );
}
