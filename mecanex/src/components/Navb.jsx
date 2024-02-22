import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarioContext } from "../context/UsuarioContext";
import "./Navb.css";
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

export const Navb = () => {
  const { user, loginUser, logoutUser } = useUsuarioContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const direcionBotonMecanex = () => {
    if (user.access !== undefined) {
      return "/perfil"
    } else {
      return "/"
    }
  }
  return (
    <>
      <Navbar fixed="top" className="nav-flot" expand="xl" container={true}>
        <Nav>
          <NavbarBrand href={  direcionBotonMecanex() }>
            <div className="logo-nav">
              <p className="p1">Me</p>
              <p className="p2">can</p>
              <p className="p3">Ex</p>
            </div>
          </NavbarBrand>
            <div className="centrador button-navbar" onClick={() => navigate("/juegos")}>
              <b>Juegos</b>
            </div>
            <div className="centrador button-navbar">
              <b>Ranking</b>
            </div>
            <div className="centrador button-navbar" onClick={() => navigate("/estadisticas")}>
              <b>Estadisticas</b>
            </div>
        </Nav>
        <Nav>
          <NavbarText>
            <div className="centrador" onClick={() => navigate("/perfil")}>
              Perfil{" "}
            </div>
          </NavbarText>
        </Nav>
      </Navbar>
    </>
  );
};
