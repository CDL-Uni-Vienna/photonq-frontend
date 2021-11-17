import React, { ReactNode } from "react";
import { useConnectedUser } from "../../hook/hook.user";
import { Route, Redirect } from "react-router-dom";
import { Path } from "../../model/model.routes";

interface PrivateRouteProps {
  children?: ReactNode;
  path: string;
  redirectPath?: Path;
  exact?: boolean;
}

export default function PrivateRoute({
  children,
  path,
  redirectPath,
  exact,
}: PrivateRouteProps) {
  const isDebug = window.location.hostname.includes("localhost");
  const user = useConnectedUser();
  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectPath || Path.Login,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
