import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components/macro";
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
  fetch("%REACT_APP_LAMBDA_URL%/default/verifyGoogleUser", {
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

const App = () => {
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("user") || "null") || emptyUser
  );
  useEffect(() => {
    (async () => {
      if (hasToken()) {
        const f = await verify();
        if (!f.ok) {
          localStorage.removeItem("user");
          setUser(emptyUser);
        }
      }
    })();
    return () => {};
  }, []);

  return (
    <UserContext.Provider
      value={{
        getUserData: () => user,
        signOut: async (errorCallback) => {
          await gapi.load("auth2", async function () {
            await gapi.auth2.init();
            const auth2 = gapi.auth2.getAuthInstance();

            auth2
              .signOut()
              .then(function () {
                console.log("User signed out.");
                localStorage.removeItem("user");
                setUser(emptyUser);
                window.location.reload();
              })
              .catch(errorCallback);
          });
        },
        isLoggedIn: () => !!user.authToken
      }}
    >
      <BrowserRouter>
        <NavigationBar />
        <SContainer>
          <Row>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/thanks" element={<Thanks />}></Route>
            </Routes>
          </Row>
        </SContainer>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
