import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarioContext } from "../../context/UsuarioContext";
import axios from "axios";

export const Home = () => {
  const navigate = useNavigate();
  const [Niveles, setNiveles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/juego/")
        .then((response) => {
          setNiveles(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="centrador root-index">
      <div className="titulo-home logo centrador">
        <p className="p1">Me</p>
        <p className="p2">can</p>
        <p className="p3">Ex</p>
      </div>
      <div className="descripcion centrador">¡Comienza un reto!</div>
      {Niveles.map((nivel) => (
        <div className="centrador">
          <div className="button button-init" onClick={() => navigate("/game?gm="+nivel.id)}>
                  <b>{nivel.titulo}</b>
          </div>
        </div>
      ))}

    </div>
  );
};
