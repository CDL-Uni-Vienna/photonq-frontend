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
    <div className={"flex flex-col items-center space-y-5 text-xl"}>
      <h3 className={"text-3xl font-bold"}>Documentation & How-To-Guides</h3>
      <p className={"md:w-8/12 md:text-center"}>
        We provide step-by-step tutorials to use our graphical user interface,
        as well as documentation to start your learning journey with PhotonQ -
        from quantum computing basics to the specific aspects of our photonic
        hardware.
      </p>
      <GuidePreviewGrid guides={guides} />
      <div className={"pt-8"}>
        <Button
          onClick={() => router.push("/how-to-guides")}
          variant={"contained"}
          size={"large"}
        >
          Read more
        </Button>
      </div>
    </div>
  );
}
