import React, { useState } from "react";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import PasswordField from "./PasswordField";
import AuthFormContainer from "./AuthFormContainer";
import { Link } from "react-router-dom";
import { Path } from "../../model/model.routes";
import { usePasswordStrength } from "../../hook/hook.password";

interface RegisterFormProps {}

interface RegisterValues {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}

export default function RegisterForm({}: RegisterFormProps) {
  const { t } = useTranslation();
  const [registerValues, setRegisterValues] = useState<RegisterValues>({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
  });
  const errorObject = usePasswordStrength({ value: registerValues.password });

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Object.values(errorObject).find((val) => val)) {
      console.log(registerValues);
    }
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: keyof RegisterValues
  ) => {
    setRegisterValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <AuthFormContainer header={"Registration"} onSubmit={(e) => register(e)}>
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
      <Button fullWidth variant={"contained"} type={"submit"}>
        {t("Register Now")}
      </Button>
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
}
