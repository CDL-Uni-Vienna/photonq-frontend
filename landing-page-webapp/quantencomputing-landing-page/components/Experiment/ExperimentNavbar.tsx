import React, { useMemo } from "react";
import Link from "next/link";
import { getPathWithId, Path } from "../../model/model.routes";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { ExperimentState } from "../../model/types/type.experiment";

import { BaseEditorPageProps } from "../../pages/experiment/[slug]";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

interface EditorNavbarProps extends BaseEditorPageProps {
  reset: () => void;
}

export default function ExperimentNavbar({
  experiment,
  isLoading,
  reset,
}: EditorNavbarProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const isResetButtonDisabled = useMemo(
    () => experiment.status !== ExperimentState.DRAFT || isLoading,
    [experiment, isLoading]
  );

  return (
    <div className={"relative w-full text-white"}>
      <nav className={"absolute left-0 right-0 bg-secondaryDark py-4 px-8"}>
        <div className={"grid grid-cols-3 w-full"}>
          <div className={"flex items-center space-x-4 justify-self-start"}>
            <img
              className={"cursor-pointer"}
              onClick={() => router.push(Path.MyProjects)}
              src="/images/logo-white.png"
              alt="Logo of the university of vienna"
            />
            <h2 className={"text-xl font-bold transition duration-200"}>
              {isLoading ? "" : experiment.experimentName}
            </h2>
          </div>
          <div className={"flex space-x-4 items-center justify-center"}>
            <ExperimentLinkElement
              highlight={!router.pathname.includes("result")}
              path={Path.SingleExperiment}
              id={experiment.experimentId}
              text={"Editor"}
            />
            {experiment.status !== ExperimentState.DRAFT && (
              <ExperimentLinkElement
                highlight={router.pathname.includes("result")}
                path={Path.ExperimentResult}
                id={experiment.experimentId}
                disabled={experiment.experimentId === experiment.experimentName}
                text={"Result"}
              />
            )}
          </div>
          <div className={"flex justify-end items-center"}>
            <Button
              disabled={isResetButtonDisabled}
              variant={"outlined"}
              onClick={reset}
            >
              {t("Reset")}
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}

/**
 *
 * @param highlight
 * @param id
 * @param text
 * @param path
 * @param disabled
 * @constructor
 */
function ExperimentLinkElement({
  highlight,
  id,
  text,
  path,
  disabled,
}: {
  highlight: boolean;
  id: string;
  text: string;
  path: Path;
  disabled?: boolean;
}) {
  const { t } = useTranslation();

  if (disabled) {
    return (
      <p
        className={clsx("text-lg", {
          "text-gray": disabled,
        })}
      >
        {t(text)}
      </p>
    );
  }

  return (
    <Link href={getPathWithId(id, path)}>
      <p
        style={{ textTransform: "uppercase" }}
        className={clsx(
          "cursor-pointer text-lg duration-300 transform hover:underline",
          {
            "underline font-bold text-white": highlight,
            "text-primary": !highlight,
          }
        )}
      >
        {t(text)}
      </p>
    </Link>
  );
}
