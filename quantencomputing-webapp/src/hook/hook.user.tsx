import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

/**
 *
 */
export function useConnectedUser() {
  const { value: user, setValue: setUser } = useContext(AuthContext);
  return user;
}
