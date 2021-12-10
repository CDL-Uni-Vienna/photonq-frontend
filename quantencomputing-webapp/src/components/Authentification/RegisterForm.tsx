import React, { useState } from "react";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import PasswordField from "./PasswordField";
import AuthFormContainer from "./AuthFormContainer";
import { Link } from "react-router-dom";
import { Path } from "../../model/model.routes";
import { usePasswordStrength } from "../../hook/hook.password";
import { RegisterCredentials } from "../../model/types/type.auth";
import { register } from "../../model/model.api";
import { RouteComponentProps, withRouter } from "react-router";
import { red } from "@mui/material/colors";
import LoadingButton from "../LoadingButton";

interface RegisterValues {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}

export default withRouter(function RegisterForm(
  props: RouteComponentProps<any>
) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [registerValues, setRegisterValues] = useState<RegisterValues>({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
  });
  const errorObject = usePasswordStrength({ value: registerValues.password });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFormValues()) return;
    setIsLoading(true);
    const registerCredentials: RegisterCredentials = {
      name: `${registerValues.firstName} ${registerValues.secondName}`,
      email: registerValues.email,
      password: registerValues.password,
    };
    try {
      await register(registerCredentials);
      setError("");
      props.history.push(Path.Login);
    } catch (e) {
      setError("Authorization information is missing or invalid.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: keyof RegisterValues
  ) => {
    setRegisterValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const validateFormValues = () => {
    return Object.values(errorObject).some((value) => !value);
  };

  return (
    <AuthFormContainer
      header={"Registration"}
      onSubmit={(e) => handleOnSubmit(e)}
    >
      <TextField
        value={registerValues.firstName}
        onChange={(e) => handleOnChange(e, "firstName")}
        fullWidth
        variant={"outlined"}
        label={t("First Name")}
      />
      <TextField
        value={registerValues.secondName}
        onChange={(e) => handleOnChange(e, "secondName")}
        fullWidth
        variant={"outlined"}
        label={t("Last Name")}
      />
      <TextField
        value={registerValues.email}
        onChange={(e) => handleOnChange(e, "email")}
        fullWidth
        required
        variant={"outlined"}
        type={"email"}
        label={t("Email Address")}
      />
      <PasswordField
        value={registerValues.password}
        handleOnChange={(e) => handleOnChange(e, "password")}
        required
        fullWidth
        errorObject={errorObject}
        label={"Password"}
      />
      <FormControlLabel
        control={<Checkbox required defaultChecked />}
        label={t("I accept the terms of service.")}
      />
      <LoadingButton
        isLoading={isLoading}
        fullWidth
        variant={"contained"}
        type={"submit"}
        text={t("Register Now")}
      />
      {error.length ? (
        <div style={{ color: red.A700 }} className={"flex justify-center"}>
          *{t(error)}
        </div>
      ) : null}
      <div className={"flex justify-center"}>
        <div className={"flex space-x-5"}>
          <p>{t("Already have an account?")}</p>
          <Link
            className={
              "text-primary font-bold transform hover:-translate-y-1 duration-300"
            }
            to={Path.Login}
          >
            {t("Login")}
          </Link>
        </div>
      </div>
    </AuthFormContainer>
  );
});
