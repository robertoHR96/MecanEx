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
      if ((selecionTexto + 1 ) == Textos.length) {
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
      suma = suma + texto.puntuacion
    })
    return (suma / Textos.length)
  }

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
            Pausa
          </div>
          <div
            className="boton boton-siguiente"
            onClick={() => siguienteJuego()}
          >
            Siguiente
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
              Salir
            </div>
            <div className="boton boton-seguir" onClick={() => pause()}>
              Seguir jugando
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
