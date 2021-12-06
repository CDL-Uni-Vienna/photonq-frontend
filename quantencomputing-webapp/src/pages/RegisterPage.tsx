import React from "react";
import RegisterForm from "../components/Authentification/RegisterForm";
import PageLayout from "../components/Layout/PageLayout";
import NavbarPadding from "../components/Layout/NavbarPadding";
import { Grid } from "@mui/material";
import AuthContent from "../components/Authentification/AuthContent";

export default function RegisterPage() {
  return (
    <>
      <div className={"2xl:hidden"}>
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
              <RegisterForm />
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
