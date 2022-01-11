import React, { useMemo, useState } from "react";
import Link from "next/link";
import { getPathWithId, Path } from "../../model/model.routes";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import DropDownButton from "./DropDownButton";
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
import { BaseEditorPageProps } from "../../pages/experiment/[slug]";
import { useRouter } from "next/router";

const MAX_RUNTIME = 120;

export default function ExperimentNavbar({
  experiment,
  setExperiment,
  isLoading,
}: BaseEditorPageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useConnectedUser();
  const isRunButtonDisabled = useMemo(
    () => experiment.status !== ExperimentState.DRAFT || isLoading,
    [experiment, isLoading]
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState(false);

  const runExperiment = async () => {
    try {
      const createExperimentPayload = {
        ...deleteProps<CreateExperimentPayload, ExperimentWithConfigs>(
          experiment,
          ["experimentId", "withQubitConfig", "config"]
        ),
        status: ExperimentState.IN_QUEUE,
      };
      createExperimentPayload.circuitId = experiment.config!.circuit_id;
      const res = await createExperiment(createExperimentPayload, user!.token);
      router.push(getPathWithId(res.experimentId, Path.ExperimentResult));
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
            <ExperimentLinkElement
              highlight={router.pathname.includes("result")}
              path={Path.ExperimentResult}
              id={experiment.experimentId}
              disabled={experiment.experimentId === experiment.experimentName}
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
      {isDialogOpen && experiment.status === ExperimentState.DRAFT && (
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
}

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
