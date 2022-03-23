import React, { useContext, useState } from "react";
import AuthFormContainer from "./AuthFormContainer";
import { TextField } from "@mui/material";
import PasswordField from "./PasswordField";
import { useTranslation } from "react-i18next";
import { Path } from "../../model/model.routes";
import { AuthContext } from "../../providers/AuthProvider";
import { loginWthUserNameAndPassword } from "../../model/model.api";
import LoadingButton from "../LoadingButton";
import { LoginCredentials } from "../../model/types/type.auth";
import { red } from "@mui/material/colors";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginForm() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { setValue: setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const router = useRouter();
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
      const response = await loginWthUserNameAndPassword({
        username: loginValues.username,
        password: loginValues.password,
      });
      setUser({
        token: response.token,
        id: response.id,
        username: response.email,
        name: response.name,
      });
      setError("");
      router.push(Path.MyProjects);
    } catch (e) {
      setError("Authorization information is missing or invalid.");
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <AuthFormContainer header={"Sign in to PhotonQ"} onSubmit={(e) => login(e)}>
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
        label={"Password *"}
      />
      <LoadingButton
        text={t("Sign in")}
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
          <Link href={Path.Register}>
            <p
              className={
                "cursor-pointer text-primary font-bold transform hover:-translate-y-1 duration-300"
              }
            >
              {t("Register now!")}
            </p>
          </Link>
        </div>
      </div>
    </AuthFormContainer>
  );
}
