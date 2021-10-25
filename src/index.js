import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider } from '@mui/material/styles';
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./config";

import history from "./utils/history";

const config = getConfig();

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  redirectUri: "http://localhost:3000",
  onRedirectCallback,
};

ReactDOM.render(
<StyledEngineProvider injectFirst>
  <React.StrictMode>
  <Auth0Provider {...providerConfig}>
    <App />
    </Auth0Provider>
  </React.StrictMode>
  
  </StyledEngineProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
