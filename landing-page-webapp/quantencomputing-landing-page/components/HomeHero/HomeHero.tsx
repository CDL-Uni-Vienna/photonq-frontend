import React from "react";
import SectionHeader from "../Section/SectionHeader";
import Button from "../Button/Button";
import { getWebAppUrl } from "../../utils/webapp";

export default function HomeHero() {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <div style={{ maxWidth: 604 }}>
        <img
          className={"w-full h-auto"}
          src="/images/getting-started-screen.png"
          alt={"Quantum Computing Webapp UI"}
        />
      </div>
      <div className={"space-y-5 flex flex-col items-center"}>
        <SectionHeader centered text={"Start quantum computing with us."} />
        <p className={"text-grey"}>
          Learn, develop and run programs with our quantum computer
        </p>
      </div>
      <div
        className={
          "mt-10 space-y-2 flex flex-col justify-center md:flex-row md:space-y-0"
        }
      >
        <Button
          onClick={() => window.open(getWebAppUrl(), "_blank")}
          variant={"primary"}
        >
          Register now
        </Button>
      </div>
    </div>
  );
}
