import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Navbar from "../components/Navbar/Navbar";
import PageLayout from "../components/Layout/PageLayout";
import AuthProvider from "../providers/AuthProvider";
import { Path } from "../model/model.routes";
import AuthPageLayout from "../components/Layout/AuthPageLayout";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";

if (process.env.NEXT_PUBLIC_MOCK_API === "True") {
  require("../api-mock");
}

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        {!router.pathname.includes("experiment") && <Navbar />}
        {router.pathname === Path.Login || router.pathname === Path.Register ? (
          <AuthPageLayout>
            <Component {...pageProps} />
          </AuthPageLayout>
        ) : router.pathname.includes("experiment") ? (
          <Component {...pageProps} />
        ) : (
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}
export default appWithTranslation(MyApp);
