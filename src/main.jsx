import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AccountContextProvider } from "./hooks/AccountContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="galaxy-quest">
    <AccountContextProvider>
    <App />
    </AccountContextProvider>
  </BrowserRouter>
);
