import React, { useLayoutEffect, useState } from "react";
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
  const [input, setInput] = useState(value);

  useLayoutEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <div className={"flex items-center space-x-2"}>
      <embed src={iconsSrc} />
      <TextField
        onBlur={(event) => {
          const currentValue = input.replace(",", ".");
          setValue(currentValue);
          setInput(currentValue.length ? currentValue.replace(".", ",") : "0");
        }}
        inputProps={{
          style: {
            color: "white",
          },
          step: 0.1,
        }}
        type={"number"}
        value={input}
        disabled={isDisabled}
        size={"small"}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        color={"primary"}
        className={clsx({
          ["bg-primaryDark rounded-sm"]: !isDisabled,
        })}
      />
    </div>
  );
}
