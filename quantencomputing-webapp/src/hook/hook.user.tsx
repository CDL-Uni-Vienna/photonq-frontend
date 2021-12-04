import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

/**
 *
 */
export function useConnectedUser() {
  const { value: user } = useContext(AuthContext);

  return user;
}
