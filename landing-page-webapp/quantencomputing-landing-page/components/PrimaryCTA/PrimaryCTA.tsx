import React from "react";
import { getWebAppUrl } from "../../utils/webapp";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { Path } from "../../model/model.routes";

export default function PrimaryCTA() {
  const router = useRouter();

  return (
    <div
      className={
        "px-6 md:px-0 bg-primary text-white flex flex-col items-center py-14 space-y-10"
      }
    >
      <div className={"text-center space-y-7"}>
        <h3 className={"text-2xl font-bold"}>Start Quantum Computing</h3>
        <p>
          Create your free account and start experimenting with our Quantum
          Computer!
        </p>
      </div>
      <Button
        onClick={() => router.push(Path.Login)}
        color={"secondary"}
        variant={"outlined"}
      >
        Start quantum computing
      </Button>
    </div>
  );
}
