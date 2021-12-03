import React, { ReactNode } from "react";
import { CustomTableCellProps } from "./type.customTableCells";
import TimerIcon from "@mui/icons-material/Timer";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTranslation } from "react-i18next";
import { ExperimentState } from "../../../model/types/type.experiment";

export default function StateCell({
  value,
}: CustomTableCellProps<ExperimentState>) {
  console.log(value);
  switch (value) {
    case ExperimentState.Done:
      return (
        <BaseStateCell
          color={"green"}
          value={value}
          icon={<CheckCircleOutlineIcon />}
        />
      );
    case ExperimentState.Failed:
      return (
        <BaseStateCell
          color={"orange"}
          value={value}
          icon={<HighlightOffIcon />}
        />
      );
    case ExperimentState.Running:
      return <BaseStateCell value={value} icon={<TimerIcon />} />;
    default:
      return null;
  }
}

function BaseStateCell({
  value,
  icon,
  color,
}: {
  value: ExperimentState;
  icon: ReactNode;
  color?: string;
}) {
  const removeUpperCase = (val: string) => {
    return val
      .toLowerCase()
      .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
  };

  const { t } = useTranslation();
  return (
    <div style={{ color }} className={"flex space-x-4 items-center"}>
      <p style={{ width: 70 }}>{t(removeUpperCase(value))}</p>
      {icon}
    </div>
  );
}
