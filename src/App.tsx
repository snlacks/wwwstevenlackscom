import React from "react";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components/macro";
import { Home } from "./Home";
import { Login } from "./Login";
import { NavigationBar } from "./NavigationBar";
import { Thanks } from "./Thanks";
import { UserContext, UserHelper, userHelper } from "./UserContext";

type AppProps = { userHelper: UserHelper };

const SContainer = styled(Container)`
  margin: 1rem 1rem 0;
`;

function App({ userHelper }: AppProps) {
  return (
    <UserContext.Provider value={userHelper}>
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
}

App.defaultProps = {
  userHelper,
};

export default App;
