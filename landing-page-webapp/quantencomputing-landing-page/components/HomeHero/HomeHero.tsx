import React from "react";
import SectionHeader from "../Section/SectionHeader";
import { getWebAppUrl } from "../../utils/webapp";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { Path } from "../../model/model.routes";
import { BgFade, MovFade } from "./style";
import NavbarPadding from "../Layout/NavbarPadding";

export default function HomeHero() {
  const router = useRouter();

  return (
    <div className="relative">
      <NavbarPadding />
      <BgFade className="flex flex-col xl:flex-row-reverse items-center justify-center align-center">
        <div className="max-w-lg xl:max-w-4xl">
          <img
            className={"w-full h-auto relative z-10 mt-20 sm:mt-0"}
            src="/images/getting-started-screen.png"
            alt={"Quantum Computing Webapp UI"}
          />
        </div>
        <div
          className={
            "space-y-5 flex flex-col items-center relative z-10 text-white sm:p-8 px-8"
          }
        >
          <SectionHeader centered text={"Start quantum computing with us."} />
          <p className="text-xl text-center">
            Learn quantum computing and run your circuits on our photonic
            quantum hardware
          </p>
          <div
            className={
              "mt-10 space-y-2 flex flex-col justify-center md:flex-row md:space-y-0"
            }
          >
            <Button
              onClick={() => router.push(Path.Register)}
              className={"relative z-50"}
              variant={"contained"}
              size={"large"}
            >
              Register now
            </Button>
          </div>
        </div>
      </BgFade>
      <object
        type="image/svg+xml"
        data="/images/dreieck.svg"
        className="w-full absolute bottom-0 z-0"
      />
    </div>
  );
}
