import React, { useEffect, useState, useRef } from "react";
import { Casilla } from "./Casilla";
import { InfoGame } from "./InfoGame";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { useUsuarioContext } from "../../context/UsuarioContext";

export const Game = () => {
  const { user, loginUser, logoutUser } = useUsuarioContext();
  const [ModalSalir, setModalSalir] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Obtén la ubicación actual

  // Función para obtener el valor del parámetro de consulta 'code'
  const getCodeFromQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("gm");
  };

  // Llama a la función para obtener el valor de 'code'
  const gm = getCodeFromQuery();

  const [Nivel, setNivel] = useState({ id: "", titulo: "", descripcion: "" });
  useEffect(() => {
    axios
      .get("http://localhost:8000/juego/" + gm + "/")
      .then((response) => {
        setNivel(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [Textos, setTextos] = useState([]);

  const [selecionTexto, setSeleccionTexto] = useState(0);
  const [inputText, setInputText] = useState("");

  const [contador, setContador] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  useEffect(() => {
    loginUser({
      ...user,
      infoGame: [],
    });
  }, []);
  useEffect(() => {
    let intervalo;

    if (corriendo) {
      intervalo = setInterval(() => {
        setContador((prevContador) => prevContador + 1);
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [corriendo]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/nivel/niveles_por_juego/?juego_id=" + gm)
      .then(function (response) {
        response.data.sort((a, b) => a.dificultad - b.dificultad);
        let listaVacia = [];
        response.data.map((texto) => {
          listaVacia.push({ ...texto, puntuacion: "--" });
        });
        setTextos(listaVacia);
        setJuego(listaVacia[0]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const iniciarContador = () => {
    setCorriendo(true);
  };

  const detenerContador = () => {
    setCorriendo(false);
  };

  const [Juego, setJuego] = useState();

  const [pmi, setPmi] = useState(0);

  const calculadorPMI = () => {
    let textoSplit = Juego.texto.split(" ");
    let inputTextSplit = inputText.split(" ");
    let cantidadPalabras = 0;
    inputTextSplit.map((palabra, index) => {
      palabra === textoSplit[index] && cantidadPalabras++;
    });
    let valortime = contador / 60;
    if (valortime < 0) {
      valortime = 1;
    }
    let time = parseInt(cantidadPalabras / valortime);
    if (time != isNaN) {
      setPmi(time);
    } else {
      setPmi("0");
    }
  };

  const pause = () => {
    setCorriendo(!corriendo);
    setModalSalir(!ModalSalir);
  };

  const [finGame, setFinGame] = useState(false);

  const finDelJuego = () => {
    setFinGame(true);
    detenerContador();
  };

  const [finNivel, setFinNivel] = useState(false);

  useEffect(() => {
    if (Juego != null) {
      inputText === Juego.texto ? finDelJuego() : setFinGame(false);
      // Llamamos al calculador de PMI
      calculadorPMI();
    }
  }, [inputText]);

  const inputRef = useRef(null);

  useEffect(() => {
    // En el montaje del componente, enfocamos el input automáticamente
    inputRef.current.focus();
    // Iniciamo el contador de tiempo, para calcular la velocidad de escritura
    iniciarContador();
  }, []);

  useEffect(() => {
    if (Textos != undefined) {
      setJuego(Textos[selecionTexto]);
    }
  }, [selecionTexto]);

  const [claseTablero, setClaseTablero] = useState("tablero-inicio");

  const siguienteJuego = () => {
    if (finGame) {
      detenerContador();
      modInfoGame();
      setContador(0);
      setCorriendo(false);
      setClaseTablero("tablero-fin");
      if (selecionTexto + 1 == Textos.length) {
        setFinNivel(true);
      } else {
        setTimeout(() => {
          setInputText("");
          setPmi(0);
          setFinGame(false);
          // En el montaje del componente, enfocamos el input automáticamente
          inputRef.current.focus();
          // Iniciamo el contador de tiempo, para calcular la velocidad de escritura
          setSeleccionTexto(selecionTexto + 1);
          setClaseTablero("tablero-inicio");
        }, 365);
        iniciarContador();
      }
    }
  };

  const modInfoGame = () => {
    let listaDosTextos = [];
    Textos.map((texto) => {
      listaDosTextos.push({ ...texto });
    });
    listaDosTextos[selecionTexto].puntuacion = pmi;
    setTextos(listaDosTextos);
  };

  const puntuacionTotal = () => {
    let suma = 0;
    Textos.map((texto) => {
      suma = suma + texto.puntuacion;
    });
    return suma / Textos.length;
  };

  return (
    <>
      <div className="game">
        <div className="centrador">
          <div className="centrador logo">{Nivel.titulo}</div>
        </div>
        <div className="contador-palabras-por-minuto ">
          Nivel: <b>{selecionTexto + 1}</b> de <b>{Textos.length}</b>
        </div>
        <div className="contador-palabras-por-minuto ">
          Palabras por minuto: <b>{!isNaN(pmi) ? pmi : 0}</b>
        </div>
        <div className={"tablero " + claseTablero}>
          {Juego != null &&
            Juego.texto
              .split(/(?!^)/)
              .map((item) => (item.trim() === "" ? " " : item))
              .map((letra, index) => (
                <Casilla
                  posicion={index}
                  letraAsignada={letra}
                  inputText={inputText}
                />
              ))}
        </div>
        <div className="centrador content-inputText-game">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="inputText-game"
            ref={inputRef}
          />
        </div>
        <div className="botones-navegacion-game">
          <div className="boton boton-anterior" onClick={() => pause()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-pause-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
            </svg>
          </div>
          <div
            className="boton boton-siguiente"
            onClick={() => siguienteJuego()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-chevron-double-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
              />
              <path
                fill-rule="evenodd"
                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
        </div>
        {Textos != undefined && <InfoGame Textos={Textos} />}
        <div className="texto-informacion">
          En esta lista, los textos comienzan con oraciones más simples y
          cortas, con un vocabulario y estructura más fácil de digitar. A medida
          que avanzas en la lista, los textos se vuelven progresivamente más
          largos y complejos, lo que requerirá un mayor nivel de habilidad y
          velocidad en la mecanografía.
        </div>
      </div>
      <Modal isOpen={ModalSalir} centered={true}>
        <ModalHeader>¿Seguro que desea salir?</ModalHeader>
        <ModalBody>
          <p>Si sale no se guardara su avanze actual</p>
          <p>
            Tiempo actual: <b>{contador} seg</b>
          </p>
          <p>
            Palabras por minuto: <b>{!isNaN(pmi) ? pmi : 0}</b>
          </p>
        </ModalBody>
        <ModalFooter>
          <div className="botones-menu-game ">
            <div className="boton boton-salir" onClick={() => navigate("/")}>
              <div className="centrador">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-backspace"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                  <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                </svg>
              </div>
              <div className="centrador">Atras</div>
            </div>
            <div className="boton boton-seguir" onClick={() => pause()}>
              <div className="centrador">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </div>
              <div className="centrador">Seguir</div>
            </div>
          </div>
        </ModalFooter>
      </Modal>
      <Modal isOpen={finNivel}>
        <ModalHeader>Fin del juego</ModalHeader>
        <ModalBody>
          Fin del juego, enorabuena has ganado con una puntuacion de{" "}
          {puntuacionTotal()}
        </ModalBody>
        <ModalFooter>
          <div className="boton boton-seguir" onClick={() => navigate("/")}>
            Seguir jugando
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};
/*

          <Casilla
            posicion={index}
            letraAsignada={letra}
            inputText={inputText}
          />
*/
