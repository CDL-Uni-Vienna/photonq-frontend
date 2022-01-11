import React from "react";
import Button from "../Button/Button";
import { getWebAppUrl } from "../../utils/webapp";

export default function PrimaryCTA() {
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
        onClick={() => window.open(getWebAppUrl(), "_blank")}
        variant={"outlined"}
      >
        Start quantum computing
      </Button>
    </div>
  );
}
