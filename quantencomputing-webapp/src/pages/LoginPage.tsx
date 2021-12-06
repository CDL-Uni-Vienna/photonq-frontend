import React from "react";
import PageLayout from "../components/Layout/PageLayout";
import NavbarPadding from "../components/Layout/NavbarPadding";
import { Grid } from "@mui/material";
import AuthContent from "../components/Authentification/AuthContent";
import LoginForm from "../components/Authentification/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className={"md:hidden"}>
        <NavbarPadding />
      </div>
      <Grid container columnSpacing={12}>
        <Grid item md={7}>
          <PageLayout>
            <div
              className={
                "pt-8 md:pt-0 md:h-screen flex flex-col justify-center"
              }
            >
              <LoginForm />
            </div>
          </PageLayout>
        </Grid>
        <Grid item md={5}>
          <AuthContent
            header={"Start Quantum Computing with us!"}
            content={
              "Our intuitive approach makes it easy for beginners to start with quantum computing and allows experts to run complex experiments."
            }
          />
        </Grid>
      </Grid>
    </>
  );
}
