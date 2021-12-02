import React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";
import { getPathWithId, Path } from "../../model/model.routes";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { format } from "date-fns";
import DropDownButton from "./DropDownButton";
import { useSelectedExperiment } from "../../hook/hook.experiment";

interface ExperimentTopBarProps extends RouteComponentProps<{ id: string }> {}

export default withRouter(function ExperimentNavbar({
  location,
  match,
  history,
}: ExperimentTopBarProps) {
  const { t } = useTranslation();
  const { experiment, isLoading } = useSelectedExperiment(match.params.id);

  return (
    <div className={"relative w-full text-white"}>
      <nav className={"absolute left-0 right-0 bg-secondaryDark py-4 px-8"}>
        <div className={"grid grid-cols-3 w-full"}>
          <div className={"flex items-center space-x-4 justify-self-start"}>
            <img
              className={"cursor-pointer"}
              onClick={() => history.push(Path.MyProjects)}
              src="/images/logo-white.png"
              alt="Logo of the university of vienna"
            />
            <h2 className={"text-xl font-bold transition duration-200"}>
              {isLoading
                ? ""
                : `${experiment.experimentName} - ${format(
                    experiment.createdAt,
                    "P"
                  )}`}
            </h2>
          </div>
          <div className={"flex space-x-4 items-center justify-center"}>
            <ExperimentLinkElement
              highlight={!location.pathname.includes("result")}
              path={Path.SingleExperiment}
              id={match.params.id}
              text={"Editor"}
            />
            <ExperimentLinkElement
              highlight={location.pathname.includes("result")}
              path={Path.ExperimentResult}
              id={match.params.id}
              text={"Result"}
            />
          </div>
          <div className={"flex justify-end items-center"}>
            <DropDownButton
              onClick={() =>
                history.push(
                  getPathWithId(experiment.id, Path.ExperimentResult)
                )
              }
            >
              {t("Run")}
            </DropDownButton>
          </div>
        </div>
      </nav>
    </div>
  );
});

/**
 *
 * @param highlight
 * @param id
 * @param text
 * @param path
 * @constructor
 */
function ExperimentLinkElement({
  highlight,
  id,
  text,
  path,
}: {
  highlight: boolean;
  id: string;
  text: string;
  path: Path;
}) {
  const { t } = useTranslation();
  return (
    <Link
      style={{ textTransform: "uppercase" }}
      className={clsx("text-lg duration-300 transform hover:scale-110", {
        ["text-primary"]: highlight,
      })}
      to={getPathWithId(id, path)}
    >
      {t(text)}
    </Link>
  );
}
