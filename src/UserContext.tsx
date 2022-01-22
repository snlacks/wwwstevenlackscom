import { createContext } from "react";

export type User = {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  image: string;
  email: string;
  authToken: string;
};

export type UserHelper = {
  getUserData: () => User | undefined;
  signOut: (errorCallback) => Promise<void>;
  isLoggedIn: () => boolean;
};

export const userHelper = {};
export const UserContext = createContext<UserHelper>({
  getUserData: () => undefined,
  signOut: () => new Promise((resolve) => resolve()),
  isLoggedIn: () => false
});
