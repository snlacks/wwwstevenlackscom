import React, { useEffect } from "react";
import { useContext, useState } from "react";
import styled from "styled-components/macro";
import { Conditional } from "./Conditional";
import { UserContext } from "./UserContext";

declare const gapi: any;
declare const onGoogleSignIn: any;

const buttonWidth = 192;

const LogOutButton = styled.button`
  background-color: white;
  border-radius: 1px;
  border: none;
  height: 36px;
  color: #757575;
  box-shadow: 0 var(--half-spacing-px) var(--default-spacing-px) 0
    rgb(0 0 0 / 25%);
`;

const Error = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  width: ${buttonWidth}px;
  color: var(--red-500);
  text-align: center;
  padding-top: var(--half-spacing-px);
`;

export const LoginControls = () => {
  const userHelper = useContext(UserContext);
  const [error, setError] = useState("");

  useEffect(() => {
    gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: buttonWidth,
      longtitle: true,
      onsuccess: onGoogleSignIn,
      onfailure: () => setError("Problem with Sign in"),
    });
  });

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (mounted) {
        setError("");
      }
    }, 5000);
    return () => {
      mounted = false;
    };
  }, [setError]);
  return (
    <>
      <Conditional condition={!userHelper.isLoggedIn}>
        <div id="my-signin2">Sign In</div>
      </Conditional>
      <Conditional condition={userHelper.isLoggedIn}>
        <LogOutButton
          onClick={() =>
            userHelper.signOut(() => setError("Unable to log out."))
          }
        >
          Sign Out
        </LogOutButton>
      </Conditional>
      <Conditional condition={!!error}>
        <Error>{error}</Error>
      </Conditional>
    </>
  );
};
