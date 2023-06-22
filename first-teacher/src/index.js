import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from "react-bootstrap";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider dir="rtl">
    <UserProvider>
      <App />
    </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);


reportWebVitals();
