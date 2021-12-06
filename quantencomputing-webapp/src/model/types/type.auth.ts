export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 *
 */
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

/**
 * Response returned by the server after a successful login.
 */
export interface LoginResponse {
  expires: string;
  token: string;
  id: number;
  name: string;
  email: string;
}
