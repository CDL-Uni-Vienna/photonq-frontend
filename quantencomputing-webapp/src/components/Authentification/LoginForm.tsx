import React, { useContext, useState } from "react";
import AuthFormContainer from "./AuthFormContainer";
import { Button, TextField } from "@mui/material";
import PasswordField from "./PasswordField";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Path } from "../../model/model.routes";
import { AuthContext } from "../../providers/AuthProvider";
import { withRouter, RouteComponentProps } from "react-router";
import { loginWthUserNameAndPassword } from "../../model/model.api";
import { response } from "msw";
import LoadingButton from "../LoadingButton";
import { LoginCredentials } from "../../model/types/type.login";
import { red } from "@mui/material/colors";

export default withRouter(function LoginForm(props: RouteComponentProps<any>) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { setValue: setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loginValues, setLoginValue] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: keyof LoginCredentials
  ) => {
    setLoginValue((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const reponse = await loginWthUserNameAndPassword({
        username: loginValues.username,
        password: loginValues.password,
      });
      setUser({
        id: reponse.id,
        username: reponse.username,
        name: response.name,
      });
      setError("");
      props.history.push(Path.MyProjects);
    } catch (e) {
      setError("Authorization information is missing or invalid.");
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <AuthFormContainer header={"Login"} onSubmit={(e) => login(e)}>
      <TextField
        value={loginValues.username}
        onChange={(e) => handleOnChange(e, "username")}
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
      <LoadingButton
        text={t("Login")}
        isLoading={isLoading}
        fullWidth
        variant={"contained"}
        type={"submit"}
      />
      {error.length ? (
        <div style={{ color: red.A700 }} className={"flex justify-center"}>
          *{t(error)}
        </div>
      ) : null}
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
