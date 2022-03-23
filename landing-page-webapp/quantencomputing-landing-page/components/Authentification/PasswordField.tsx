import React, { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { ErrorObject, MIN_PASSWORD_LENGTH } from "../../hook/hook.password";
import { red } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

interface PasswordFieldProps extends OutlinedInputProps {
  value: string;
  handleOnChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  errorObject?: ErrorObject;
}

export default function PasswordField(props: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const { value, handleOnChange, errorObject, ...inputProps } = props;

  const getErrorText = () => {
    if (errorObject?.length) {
      return `Password is too short (at least ${MIN_PASSWORD_LENGTH} characters long)`;
    }
    if (errorObject?.strength) {
      return "Password is too weak!";
    }
    return "";
  };

  const hasError = () => Object.values(errorObject || {}).find((val) => val);

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="outlined-adornment-password">
        {props.label}
      </InputLabel>
      <OutlinedInput
        {...inputProps}
        required={true}
        autoComplete={"new-password"}
        error={hasError()}
        value={value}
        onChange={handleOnChange}
        type={showPassword ? "text" : "password"}
        label={props.label}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {hasError() && (
        <span style={{ color: red["500"] }}>{t(getErrorText())}</span>
      )}
    </FormControl>
  );
}
