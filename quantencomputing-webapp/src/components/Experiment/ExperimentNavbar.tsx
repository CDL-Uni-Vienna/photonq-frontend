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

const MAX_RUNTIME = 120;

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
    () =>
      experiment.status !== ExperimentState.IN_QUEUE ||
      experiment.experimentId !== experiment.experimentName ||
      isLoading,
    [experiment, isLoading]
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState(false);

  const runExperiment = async () => {
    try {
      const createExperimentPayload = deleteProps<
        CreateExperimentPayload,
        ExperimentWithConfigs
      >(experiment, ["experimentId", "withQubitConfig"]);
      await createExperiment(createExperimentPayload, user!.token);
      history.push(
        getPathWithId(experiment.experimentId, Path.ExperimentResult)
      );
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
          <MaxRuntimeDialog
            currentMaxRuntime={experiment.maxRuntime.toString()}
            open={isDialogOpen}
            isOpen={setIsDialogOpen}
            onButtonClick={(input) => {
              if (!input) return;
              if (+input > MAX_RUNTIME) {
                return `Has to be smaller or equal than ${MAX_RUNTIME}`;
              }
              if (+input < 1) {
                return `Has to be at least 1`;
              }
              setExperiment((prev) => ({
                ...prev,
                maxRuntime: +input,
              }));
            }}
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
 * @param props
 * @constructor
 */
function MaxRuntimeDialog(props: {
  open: boolean;
  isOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  onButtonClick: (input?: string) => string | undefined;
  currentMaxRuntime: string;
}) {
  return (
    <SystemDialog
      defaultInput={props.currentMaxRuntime}
      inputType={"number"}
      isOpen={props.open}
      setIsOpen={props.isOpen}
      label={"Max Runtime"}
      buttonText={"Save"}
      onButtonClick={props.onButtonClick}
      title={"Set Max Runtime"}
    />
  );
}

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
        "underline font-bold text-white": highlight,
        "text-primary": !highlight,
      })}
      to={getPathWithId(id, path)}
    >
      {t(text)}
    </Link>
  );
}
