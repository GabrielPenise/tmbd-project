import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import styless from "./styless.css";
import { SearchContextProvider } from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SearchContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </SearchContextProvider>
  </BrowserRouter>
);
