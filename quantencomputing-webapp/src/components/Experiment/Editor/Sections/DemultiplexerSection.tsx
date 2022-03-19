import React from "react";
import ContentContainer from "../../../Layout/ContentContainer";
import { secondaryDark } from "../../../../theme/theme.config";
import { useTranslation } from "react-i18next";
import EditorSectionHeader from "./EditorSectionHeader";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function DemultiplexerSection() {
  const { t } = useTranslation();
  return (
    <div className={"flex space-x-10"}>
      <ContentContainer
        withPadding
        className={"w-full relative"}
        color={secondaryDark}
      >
        <div className={"w-full text-white space-y-4"}>
          <EditorSectionHeader header={"Source"} />
          <div className={"flex justify-between mr-10"}>
            <div>
              <p>{t("Wavelength")}</p>
              <p>{t("Single Photon Rate")}</p>
              <p>{t("Brightness")}</p>
            </div>
            <div>
              <p>925.00 nm</p>
              <p>16.00 MHz</p>
              <p>20.00%</p>
            </div>
            <div>
              <p>{t("Purity")}</p>
              <p>{t("Indistinguishable")}</p>
              <p>{t("Temperature")}</p>
            </div>
            <div>
              <p>95.00%</p>
              <p>90.00%</p>
              <p>4.00 K</p>
            </div>
          </div>
          <div
            className={
              "flex absolute -right-12 top-1/2 transform -translate-y-1/2"
            }
          >
            <embed src="/images/demultiplexer-editor.svg" />
            <ArrowRightAltIcon color={"primary"} fontSize={"large"} />
          </div>
        </div>
      </ContentContainer>
      <ContentContainer
        withPadding
        className={"w-full space-y-3"}
        color={secondaryDark}
      >
        <EditorSectionHeader header={"Demultiplexer"} />
        <p className={"text-white"}>
          {t(
            "The demultiplexer is a photonic setup that uses an active element to switch one common input line to several separate output lines."
          )}
        </p>
      </ContentContainer>
    </div>
  );
}
