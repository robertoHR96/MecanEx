import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/home/Login";
import { Juegos } from "../pages/home/Juegos";
import { Game } from "../pages/game/Game";
import { Navb } from "../components/Navb";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import Footer from "../components/Footer";
import Register from "../pages/register/Register";
import { Perfil } from "../pages/perfil/Perfil";
import { Estadisticas } from "../pages/estadisticas/Estadisticas";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navb />
      <Routes>
        <Route
          path="/"
          element={
            <Home tipe={"login"}>
              <Login />
            </Home>
          }
        />
        <Route
          path="/home"
          element={
            <Home tipe={"login"}>
            </Home>
          }
        />
        <Route
          path="/register"
          element={
            <Home tipe={"register"}>
            </Home>
          }
        />
        <Route
          path="/perfil"
          element={<Perfil />}
        />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
