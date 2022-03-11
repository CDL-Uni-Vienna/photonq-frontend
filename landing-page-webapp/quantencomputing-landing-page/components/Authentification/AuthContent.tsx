import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import React from "react";

export default function AuthContent(props: {
  header: string;
  content: string;
}) {
  const { t } = useTranslation();
  return (
    <div
      className={
        "bg-primaryLightBg w-full h-full flex flex-col justify-center items-center p-8 md:py-0"
      }
    >
      <img src="/images/photons.svg" alt="svg animation" />

      <div className={"space-y-5"}>
        <Typography variant={"h5"} fontWeight={"bold"}>
          {t(props.header)}
        </Typography>
        <p>{t(props.content)}</p>
      </div>
    </div>
  );
}
