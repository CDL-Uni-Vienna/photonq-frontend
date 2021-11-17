import React, { useContext, useState } from "react";
import AuthFormContainer from "./AuthFormContainer";
import { Button, TextField } from "@mui/material";
import PasswordField from "./PasswordField";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Path } from "../../model/model.routes";
import { AuthContext } from "../../providers/AuthProvider";
import { withRouter, RouteComponentProps } from "react-router";

interface LoginValues {
  email: string;
  password: string;
}

export default withRouter(function LoginForm(props: RouteComponentProps<any>) {
  const { t } = useTranslation();
  const { setValue: setUser, value: user } = useContext(AuthContext);
  const [loginValues, setLoginValue] = useState<LoginValues>({
    email: "",
    password: "",
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: keyof LoginValues
  ) => {
    setLoginValue((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({
      ...loginValues,
      id: "1",
      firstName: "",
      lastName: "",
      country: "Austria",
      occupation: "Student",
    });
    props.history.push(Path.MyProjects);
  };

  return (
    <AuthFormContainer header={"Login"} onSubmit={(e) => login(e)}>
      <TextField
        value={loginValues.email}
        onChange={(e) => handleOnChange(e, "email")}
        fullWidth
        required
        variant={"outlined"}
        type={"email"}
        label={t("Email Address")}
      />
      <PasswordField
        value={loginValues.password}
        handleOnChange={(e) => handleOnChange(e, "password")}
        required
        fullWidth
        label={"Password"}
      />
      <Button fullWidth variant={"contained"} type={"submit"}>
        {t("Login")}
      </Button>
      <div className={"flex justify-center"}>
        <div className={"flex space-x-5"}>
          <p>{t("No account?")}</p>
          <Link
            className={
              "text-primary font-bold transform hover:-translate-y-1 duration-300"
            }
            to={Path.Register}
          >
            {t("Register")}
          </Link>
        </div>
      </div>
    </AuthFormContainer>
  );
});
