import React from "react";
import { TextField } from "@mui/material";
import clsx from "clsx";

interface TextFieldWithIconProps {
  iconsSrc: string;
  value: string;
  setValue: (value: string) => void;
  isDisabled?: boolean;
}

export default function TextFieldWithIcon({
  iconsSrc,
  value,
  setValue,
  isDisabled,
}: TextFieldWithIconProps) {
  return (
    <div className={"flex items-center space-x-2"}>
      <embed src={iconsSrc} />
      <TextField
        inputProps={{
          style: {
            color: "white",
          },
        }}
        value={value}
        type={"number"}
        disabled={isDisabled}
        size={"small"}
        onChange={(e) => setValue(e.target.value)}
        color={"primary"}
        className={clsx({
          ["bg-primaryDark rounded-sm"]: !isDisabled,
        })}
      />
    </div>
  );
}
