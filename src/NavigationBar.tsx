import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router";
import styled from "styled-components/macro";
import { Conditional } from "./Conditional";
import { UserContext } from "./UserContext";
import { routes } from "./constants";

const SNavbar = styled(Navbar)({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  "& .nav-link": {
    color: "#fff"
  }
});

export const NavigationBar = () => {
  const { pathname } = useLocation();
  const { isLoggedIn } = useContext(UserContext);
  return (
    <>
      <SNavbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="/">Steven Lacks</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-menu" />
        <Navbar.Collapse id="navbar-menu">
          <Conditional condition={!pathname.match(/\/$/)}>
            <Nav.Link href={routes.home}>Home</Nav.Link>
          </Conditional>
          <Conditional condition={!isLoggedIn()}>
            <Nav.Link href={routes.login}>Sign in</Nav.Link>
          </Conditional>
          <Conditional condition={isLoggedIn()}>
            <Nav.Link href={routes.thanks}>Acknowledgements</Nav.Link>
          </Conditional>
          <Conditional condition={isLoggedIn()}>
            <Nav.Link href={routes.login}>Log out</Nav.Link>
          </Conditional>
        </Navbar.Collapse>
      </SNavbar>
    </>
  );
};
