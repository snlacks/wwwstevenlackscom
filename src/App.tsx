import React, { useEffect, useState, useMemo } from "react";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components/macro";
import { routes } from "./constants";
import { Home } from "./Home";
import { Login } from "./Login";
import { NavigationBar } from "./NavigationBar";
import { Thanks } from "./Thanks";
import { UserContext, User } from "./UserContext";

declare const gapi: any;

const SContainer = styled(Container)`
  margin: 1rem 1rem 0;
`;

const hasToken: () => boolean = () => {
  try {
    return !!JSON.parse(localStorage.getItem("user") || "").authToken;
  } catch (e) {
    return false;
  }
};

const verify: () => Promise<any> = async () =>
  fetch(`${process.env.REACT_APP_LAMBDA_URL}/default/verifyGoogleUser`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      token: JSON.parse(localStorage.getItem("user") || "{}").authToken,
      log: true
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

const emptyUser = {
  id: "",
  name: "",
  givenName: "",
  familyName: "",
  image: "",
  email: "",
  authToken: ""
};

const getStorageUser = () =>
  JSON.parse(localStorage.getItem("user") || "null") || emptyUser;

const App = () => {
  const [user, setUser] = useState<User>(getStorageUser());

  useEffect(() => {
    let mounted = true;
    let interval = setInterval(() => {
      if (getStorageUser()?.authToken !== user.authToken && mounted) {
        setUser(getStorageUser());
      }
    }, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  });
  useEffect(() => {
    (async () => {
      if (hasToken()) {
        const f = await verify();
        if (user && !f.ok) {
          localStorage.removeItem("user");
          setUser(emptyUser);
        }
      }
    })();
    return () => {};
  }, [user]);

  const userContextValue = useMemo(
    () => ({
      getUserData: () => user,
      signOut: async (errorCallback) => {
        await gapi.load("auth2", async function () {
          await gapi.auth2.init();
          const auth2 = gapi.auth2.getAuthInstance();

          auth2
            .disconnect()
            .then(function () {
              console.log("User signed out.");
              localStorage.removeItem("user");
              setUser(emptyUser);
            })
            .catch(errorCallback);
        });
      },
      setUser,
      isLoggedIn: () => !!user.authToken
    }),
    [user, setUser]
  );
  return (
    <BrowserRouter>
      <UserContext.Provider value={userContextValue}>
        <NavigationBar />
        <SContainer>
          <Row>
            <Routes>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.login} element={<Login />}></Route>
              <Route path={routes.thanks} element={<Thanks />}></Route>
            </Routes>
          </Row>
        </SContainer>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
