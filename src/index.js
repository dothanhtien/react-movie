import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "@mui/material";
import theme from "./themes/default";
import * as signalR from "@aspnet/signalr";

export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${process.env.REACT_APP_BASE_URL}/DatVeHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

connection
  .start()
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
      </React.StrictMode>,
      document.getElementById("root")
    );
  })
  .catch((err) => {
    console.log(err);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
