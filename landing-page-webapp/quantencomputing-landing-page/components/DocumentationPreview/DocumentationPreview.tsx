import React from "react";
import { GuideDocumentLocalizedPreview } from "../../cms/guide/guide.type";
import GuidePreviewGrid from "./GuidePreviewGrid";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

interface DocumentationPreviewProps {
  guides: GuideDocumentLocalizedPreview[];
}

export default function DocumentationPreview({
  guides,
}: DocumentationPreviewProps) {
  const router = useRouter();

  return (
    <div className={"flex flex-col items-center space-y-5"}>
      <h3 className={"text-2xl font-bold"}>Documentation & How-To-Guides</h3>
      <p className={"md:w-8/12 md:text-center"}>
        To get starting with Quantum Computing, we offer how-to-guides as well
        as more advanced documentation to give users access to our knowledge.
      </p>
      <GuidePreviewGrid guides={guides} />
      <div className={"pt-8"}>
        <Button
          onClick={() => router.push("/how-to-guides")}
          variant={"contained"}
        >
          Read more
        </Button>
      </div>
    </div>
  );
}
