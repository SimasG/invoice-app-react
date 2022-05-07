import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
// import { InvoicesProvider } from "./contexts/InvoicesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <React.StrictMode>
      <AuthContextProvider>
        {/* <InvoicesProvider> */}
        <App />
        {/* </InvoicesProvider> */}
      </AuthContextProvider>
    </React.StrictMode>
  </Router>
);
