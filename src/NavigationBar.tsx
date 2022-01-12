import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router";
import styled from "styled-components/macro";
import { Conditional } from "./Conditional";
import { UserContext } from "./UserContext";

const SNavbar = styled(Navbar)({
  "& .navbar-brand": {
    marginLeft: "1rem",
  },
  "& .nav-link": {
    color: "#fff",
  },
});

const paths = {
  home: "/",
  login: "/login",
};

export const NavigationBar = () => {
  const { pathname } = useLocation();
  const { isLoggedIn } = useContext(UserContext);
  return (
    <>
      <SNavbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Steven Lacks</Navbar.Brand>
        <Navbar.Collapse>
          <Conditional condition={!pathname.match(/\/$/)}>
            <Nav.Link href={paths.home}>Home</Nav.Link>
          </Conditional>
          <Conditional condition={!pathname.match("login") && !isLoggedIn}>
            <Nav.Link href={paths.login}>Sign in</Nav.Link>
          </Conditional>
          <Conditional condition={!pathname.match("login") && isLoggedIn}>
            <Nav.Link href={paths.login}>Log out</Nav.Link>
          </Conditional>
        </Navbar.Collapse>
      </SNavbar>
    </>
  );
};
