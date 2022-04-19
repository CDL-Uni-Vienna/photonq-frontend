import React, { useLayoutEffect, useState } from "react";
import { TextField } from "@mui/material";
import clsx from "clsx";

interface TextFieldWithIconProps {
  iconsSrc: string;
  value: string;
  setValue: (value: string) => void;
  isDisabled?: boolean;
  unit?: string;
}

export default function TextFieldWithIcon({
  iconsSrc,
  value,
  setValue,
  isDisabled,
  unit,
}: TextFieldWithIconProps) {
  return (
    <div className={"flex items-center space-x-2"}>
      <embed src={iconsSrc} />
      <TextField
        inputProps={{
          style: {
            color: "white",
          },
          step: 0.1,
        }}
        InputProps={{
          endAdornment: unit,
          style: {
            color: isDisabled ? "" : "white",
          },
        }}
        type={"number"}
        value={value}
        disabled={isDisabled}
        size={"small"}
        onChange={(e) => {
          setValue(e.target.value.replace(",", "."));
        }}
        color={"primary"}
        className={clsx({
          "bg-primaryDark rounded-sm": !isDisabled,
        })}
      />
    </div>
  );
}
