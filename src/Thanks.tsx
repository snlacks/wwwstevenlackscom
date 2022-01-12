import React from "react";
import styled from "styled-components/macro";

const StyledList = styled.ul`
  list-style: none;
`;

export const Thanks = () => (
  <>
    <p>
      I'd like to thank the following people for help with advice and testing.
    </p>
    <StyledList>
      <li>Tyler Hedden</li>
      <li>Ben Stark</li>
      <li>Daniel Lacks</li>
    </StyledList>
  </>
);
