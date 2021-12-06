import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";
import { getPathWithId, Path } from "../../model/model.routes";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import DropDownButton from "./DropDownButton";
import { useSelectedExperiment } from "../../hook/hook.experiment";
import {
  CreateExperimentPayload,
  ExperimentState,
  ExperimentWithConfigs,
} from "../../model/types/type.experiment";
import SystemDialog from "../SystemDialog/SystemDialog";
import { createExperiment } from "../../model/model.api";
import { useConnectedUser } from "../../hook/hook.user";
import { deleteProps } from "../../utils/utils.object";
import SystemAlert from "../SystemAlert";

interface ExperimentTopBarProps extends RouteComponentProps<{ id: string }> {}

export default withRouter(function ExperimentNavbar({
  location,
  match,
  history,
}: ExperimentTopBarProps) {
  const { t } = useTranslation();
  const user = useConnectedUser();
  const { experiment, isLoading, setExperiment } = useSelectedExperiment(
    match.params.id
  );
  const isRunButtonDisabled = useMemo(
    () => experiment.status !== ExperimentState.Running,
    [experiment]
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState(false);

  const runExperiment = async () => {
    try {
      const createExperimentPayload = deleteProps<
        CreateExperimentPayload,
        ExperimentWithConfigs
      >(experiment, ["id", "status", "withQubitConfig"]);
      await createExperiment(createExperimentPayload, user!.token);
      history.push(getPathWithId(experiment.id, Path.ExperimentResult));
    } catch (e) {
      console.error(e);
      setError(true);
      setTimeout(() => setError(false), 5000);
    }
  };

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
              {isLoading ? "" : experiment.experimentName}
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
              isDisabled={isRunButtonDisabled}
              actions={[
                {
                  label: "Set Max Runtime",
                  action: () => {
                    setIsDialogOpen(true);
                  },
                },
              ]}
              onClick={runExperiment}
            >
              {t("Run")}
            </DropDownButton>
          </div>
        </div>
      </nav>
      {isDialogOpen &&
        experiment.status !== ExperimentState.Failed &&
        experiment.status !== ExperimentState.Done && (
          <SystemDialog
            inputType={"number"}
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            label={"Max Runtime"}
            buttonText={"Save"}
            onButtonClick={(input) =>
              setExperiment((prev) => ({
                ...prev,
                maxRuntime: input ? +input : experiment.maxRuntime,
              }))
            }
            title={"Set Max Runtime"}
          />
        )}
      {error && !isLoading && (
        <SystemAlert severity={"error"}>
          {t("Could not run Experiment")}
        </SystemAlert>
      )}
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
      className={clsx("text-lg duration-300 transform hover:underline", {
        "underline font-bold": highlight,
      })}
      to={getPathWithId(id, path)}
    >
      {t(text)}
    </Link>
  );
}
