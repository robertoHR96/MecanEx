import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarioContext } from "../../context/UsuarioContext";
import axios from "axios";
import "./Juegos.css";
import { ElemenIJ } from "./ElemenIJ";

export const Juegos = () => {
  const navigate = useNavigate();
  const [Niveles, setNiveles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/juego/")
      .then((response) => {
        setNiveles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="juegos ">
      <div className="der-juegos">
        <div className="titulo-t2">Lista de juegos</div>
        <div className="lista-juegos-dis">
          {Niveles.map((nivel) => (
            <>
              <div
                className="button button-init button-juego centrador"
                onClick={() => navigate("/game?gm=" + nivel.id)}
              >
                <b>{nivel.titulo}</b>
              </div>
            </>
          ))}
        </div>
      </div>

      <div className="info-jugador">
        <ElemenIJ doble={true} title="Data Jugador" content="Hola como estas" />
        <ElemenIJ
          title="Data Jugador"
          content="Hola como estas"
        />
        <ElemenIJ
          title="Data Jugador"
          content="Hola como estas \n asdfadsfaaaaaa
          dfa
          fa
          dsf
          asdf
          a
          sdf
          asdf
          a
          sdf
          asdf
          a
          sdf
          asdf
          a
          sdfa
          dfs
          asd
          fa
          fa
          af
          da
          dfs
          asdf
          a
          dsf
          adfs
          a
          dfs
          asd
          fa
          sdf
          asd
          fa
          sdf
          ad
          sdf
          asdf
          asd
          f
          adsfasdf
          .forEach(element => {
            
          });
          "
        />
        <ElemenIJ
          title="Data Jugador"
          content="Hola como estas"
        />
        <ElemenIJ
          title="Data Jugador"
          content="Hola como estas"
        />
        <ElemenIJ doble={true} title="Data Jugador" content="Hola como estas" />
      </div>
    </div>
  );
};
