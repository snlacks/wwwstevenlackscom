import React, { useContext } from "react";
import styled from "styled-components/macro";
import { Conditional } from "./Conditional";
import { useRedirectOnNotLoggedIn } from "./LoginControls";
import { UserContext } from "./UserContext";
import  { routes } from "./constants";

const StyledList = styled.ul`
  list-style: none;
`;

export const Thanks = () => {
  const { isLoggedIn } = useContext(UserContext);
  useRedirectOnNotLoggedIn(routes.thanks);
  return (
    <Conditional condition={isLoggedIn()}>
      <p>
        I'd like to thank the following people for help with advice and testing.
      </p>
      <StyledList>
        <li>Tyler Hedden</li>
        <li>Ron "Coach P." Perisee</li>
        <li>Ben Stark</li>
        <li>Daniel Lacks</li>
      </StyledList>
    </Conditional>
  );
};
