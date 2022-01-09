import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components/macro";
import { Home } from "./Home";

const Container = styled.div`
  padding: 24px;
`;

const Header1 = styled.h1`
  margin: 0;
`;

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Header1>Steven Lacks</Header1>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
