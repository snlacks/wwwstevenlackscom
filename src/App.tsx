import React, { useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components/macro";
import { Home } from "./Home";
import { LoginControls } from "./LoginControls";
import { UserContext, UserHelper, userHelper } from "./UserContext";

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 160px 1fr 200px;
  grid-template-rows: 45px calc(100vh - 45px);
  grid-template-areas: "header spacer signin" "body body body";
  align-items: stretch;

  .header {
    grid-area: header;
    > div {
      align-self: center;
    }
  }

  .body {
    grid-area: body;
    padding: 0 var(--half-spacing-px);
  }

  .header,
  .spacer,
  .signin {
    display: grid;
  }

  .header,
  .spacer,
  .signin {
    background-color: var(--dark-background);
    padding: var(--half-spacing-px);
  }

  .signin {
    grid-area: signin;
    align-content: center;
    justify-items: stretch;
    align-items: stretch;
  }
`;

type AppProps = { userHelper: UserHelper };

function App({ userHelper }: AppProps) {
  return (
    <UserContext.Provider value={userHelper}>
      <BrowserRouter>
        <Grid>
          <div className="header">
            <div>Steven Lacks</div>
          </div>
          <div className="signin">
            <LoginControls />
          </div>
          <div className="spacer" />
          <div className="body">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Grid>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

App.defaultProps = {
  userHelper,
};

export default App;
