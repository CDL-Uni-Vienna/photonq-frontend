import React, { Suspense } from "react";
import AuthProvider from "./providers/AuthProvider";
import { getPrivateRoutes, getPublicRoutes, Path } from "./model/model.routes";
import PrivateRoute from "./components/Navbar/PrivateRoute";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { CircularProgress, ThemeProvider } from "@mui/material";
import theme from "./theme/theme";

function App() {
  return (
    <Suspense fallback="loading">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
            <Switch>
              <PrivateRoute exact path={"/"} redirectPath={Path.MyProjects} />
              {getPrivateRoutes().map((route, index) => (
                <PrivateRoute exact key={index} path={route.path}>
                  <Suspense fallback={PageFallback}>
                    {/*@ts-ignore this comment will be removed after the function getPrivateRoutes() only returns React components*/}
                    <route.page />
                  </Suspense>
                </PrivateRoute>
              ))}
              {getPublicRoutes().map((route, index) => (
                <Route exact key={index} path={route.path}>
                  <route.page />
                </Route>
              ))}
              <PrivateRoute path={"/"} redirectPath={Path.Login} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </Suspense>
  );
}

function PageFallback() {
  return (
    <div className={"h-screen w-screen flex justify-center items-center"}>
      <CircularProgress style={{ fontSize: 80 }} />
    </div>
  );
}

export default App;
