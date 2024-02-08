import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./pages/game/Game.css"
import "./pages/home/Login.css"
import App from "./App";
import { AppRouter } from "./routers/AppRouter";
import reportWebVitals from "./reportWebVitals";
import { UsuarioProvider } from "./context/UsuarioContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UsuarioProvider>
    <AppRouter>
      <App />
    </AppRouter>
  </UsuarioProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
