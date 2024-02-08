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
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Navbar fixed="top" className="nav-flot" expand="xl" container={true}>
        <Nav>
          <NavbarBrand href="/">
            <div className="logo-nav">
              <p className="p1">Me</p>
              <p className="p2">can</p>
              <p className="p3">Ex</p>
            </div>
          </NavbarBrand>
          <NavItem></NavItem>
        </Nav>
        <Nav>
          <NavbarText>
            <div className="centrador">Perfil </div>
          </NavbarText>
        </Nav>
      </Navbar>
    </>
  );
};
