import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";
import { Conditional } from "./Conditional";
import { routes } from "./constants";
import { UserContext } from "./UserContext";

declare const gapi: any;

export const buttonWidth = 184;

const LogOutButton = styled.button`
  margin-left: 12px;
  display: inline-block;
  background-color: white;
  font-family: Roboto, arial, sans-serif;
  font-size: 13px;
  line-height: 34px;
  letter-spacing: 0.21px;
  width: ${buttonWidth}px;
  font-weight: 500;
  border-radius: 1px;
  border: none;
  height: 36px;
  color: #757575;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 25%);
  &:active,
  &:hover,
  &:focus {
    box-shadow: 0 0 3px 3px rgb(66 133 244 / 30%);
  }
`;

const Error = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  width: ${buttonWidth}px;
  color: var(--red-500);
  text-align: center;
  padding-top: var(--half-spacing-px);
`;

export const useRedirectOnNotLoggedIn = (path: string) => {
  const { isLoggedIn } = useContext(UserContext);
  console.log(isLoggedIn())
  if (!isLoggedIn()) {
    console.log('navigating')
    window.location.replace(`/login?redirect=${path}`);
  }
};

export const LoginControls = () => {
  const userHelper = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
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

  useEffect(() => {
    gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: buttonWidth,
      longtitle: true,
      onsuccess: (googleUser) => {
        const profile = googleUser.getBasicProfile();
        const tempUser = {
          id: profile.getId(),
          name: profile.getName(),
          givenName: profile.getGivenName(),
          familyName: profile.getFamilyName(),
          image: profile.getImageUrl(),
          email: profile.getEmail(),
          authToken: googleUser.getAuthResponse().id_token
        };
        localStorage.setItem("user", JSON.stringify(tempUser));
        window.location.replace(searchParams.get("redirect") || routes.home)
      }
    });
  });

  return (
    <Card>
      <Conditional condition={!userHelper.isLoggedIn()}>
        <Card.Body>
          <div id="my-signin2">Sign In</div>
          <p>
            This site is invitation only, if you weren't invited, this login
            won't work.
          </p>
        </Card.Body>
      </Conditional>
      <Conditional condition={userHelper.isLoggedIn()}>
        <Card.Body>
          <LogOutButton
            onClick={() =>
              userHelper.signOut(() => setError("Unable to log out."))
            }
          >
            Click Here to Log Out
          </LogOutButton>
        </Card.Body>
      </Conditional>
      <Conditional condition={!!error}>
        <Error>{error}</Error>
      </Conditional>
    </Card>
  );
};
