import React, { useContext } from "react";
import styled from "styled-components/macro";
import { Conditional } from "./Conditional";
import { UserContext } from "./UserContext";

const StyledList = styled.ul`
  list-style: none;
`;

export const Thanks = () => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <Conditional condition={isLoggedIn}>
      <p>
        I'd like to thank the following people for help with advice and testing.
      </p>
      <StyledList>
        <li>Tyler Hedden</li>
        <li>Ben Stark</li>
        <li>Daniel Lacks</li>
      </StyledList>
    </Conditional>
  );
};
