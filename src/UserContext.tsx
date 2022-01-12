import { createContext } from "react";

declare const gapi: any;

type User = {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  image: string;
  email: string;
  authToken: string;
};

export type UserHelper = {
  getUserData: () => User;
  signOut: (errorCallback) => Promise<void>;
  isLoggedIn: boolean;
};

export const userHelper = {
  getUserData: () =>
    JSON.parse(localStorage.getItem("user") || "null") || {
      id: "",
      name: "",
      givenName: "",
      familyName: "",
      image: "",
      email: "",
      authToken: "",
    },
  signOut: async (errorCallback) => {
    await gapi.load("auth2", async function () {
      await gapi.auth2.init();
      const auth2 = gapi.auth2.getAuthInstance();

      auth2
        .signOut()
        .then(function () {
          console.log("User signed out.");
          localStorage.removeItem("user");
          window.location.reload();
        })
        .catch(errorCallback);
    });
  },
  get isLoggedIn() {
    return this.getUserData().authToken;
  },
};
export const UserContext = createContext<UserHelper>(userHelper);
