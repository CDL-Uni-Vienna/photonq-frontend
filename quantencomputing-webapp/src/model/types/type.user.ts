export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  occupation: string;
  country: string;
  credits?: number;
  image?: string;
}
