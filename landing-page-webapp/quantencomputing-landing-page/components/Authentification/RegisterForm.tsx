import React, { useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PasswordField from "./PasswordField";
import AuthFormContainer from "./AuthFormContainer";
import { Path } from "../../model/model.routes";
import { usePasswordStrength } from "../../hook/hook.password";
import { RegisterCredentials } from "../../model/types/type.auth";
import { register } from "../../model/model.api";
import { red } from "@mui/material/colors";
import LoadingButton from "../LoadingButton";
import { useRouter } from "next/router";
import Link from "next/link";

interface RegisterValues {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [toastOpen, setToastOpen] = React.useState(false);
  const [registerValues, setRegisterValues] = useState<RegisterValues>({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
  });

  const [submit, setSubmit] = React.useState(false)

  const errorObject = usePasswordStrength({ value: registerValues.password });

  React.useEffect(() => {
    if (submit == true) {
      if (error.length === 0) {
        setToastOpen(true);
        setTimeout(() => {
          router.push(Path.Login);
        }, 1500); // this value determines the duration of the toast pop up
      }
    }
  }, [submit]);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFormValues(errorObject)) {
      setIsLoading(true);
      const registerCredentials: RegisterCredentials = {
        name: `${registerValues.firstName} ${registerValues.secondName}`,
        email: registerValues.email,
        password: registerValues.password,
      };
      try {
        await register(registerCredentials);
        setError("");
      } catch (e: any) {
        setError(e.message);
      } finally {
        setSubmit(true);
        setIsLoading(false);
      }
    }
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: keyof RegisterValues
  ) => {
    setRegisterValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const validateFormValues = (errorObject: any) => {
    return !errorObject.length && !errorObject.strength;
  };

  return (
    <>
      <AuthFormContainer
        header={"Registration"}
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
      >
        <TextField
          value={registerValues.firstName}
          onChange={(e) => handleOnChange(e, "firstName")}
          fullWidth
          required
          variant={"outlined"}
          label={t("First Name")}
        />
        <TextField
          value={registerValues.secondName}
          onChange={(e) => handleOnChange(e, "secondName")}
          fullWidth
          required
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
          label={"Password *"}
        />
        <FormControlLabel
          control={<Checkbox required defaultChecked />}
          label={t("I accept the terms of service.") as string}
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
            <Link href={Path.Login}>
              <p
                className={
                  "cursor-pointer text-primary font-bold transform hover:-translate-y-1 duration-300"
                }
              >
                {t("Sign in")}
              </p>
            </Link>
          </div>
        </div>
      </AuthFormContainer>
      <Snackbar open={toastOpen} autoHideDuration={2000}>
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          Sucessfully registered with {registerValues.email}
        </Alert>
      </Snackbar>
    </>
  );
}
