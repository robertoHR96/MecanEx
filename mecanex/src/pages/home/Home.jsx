import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUsuarioContext } from "../../context/UsuarioContext";
import axios from "axios";
import { Login } from "./Login";
import "./Login.css";

export const Home = () => {
  return (<>
    <div className="centrador baseLogin">
      <div className="centrador root-index">
        <div className="titulo-home ">
          <div className="logo">
          <p className="p1">Me</p>
          <p className="p2">can</p>
          <p className="p3">Ex</p>
          </div>
          <div className="link">
              Saber mas
          </div>
        </div>
        <Login />
      </div>
    </div>

  </>);
};
