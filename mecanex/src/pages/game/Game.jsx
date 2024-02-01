import React, { useEffect, useState, useRef } from "react";
import { Casilla } from "./Casilla";
import { InfoGame } from "./InfoGame";
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { useUsuarioContext } from "../../context/UsuarioContext";

export const Game = () => {
  const { user, loginUser, logoutUser } = useUsuarioContext();
  const [ModalSalir, setModalSalir] = useState(false);
  const navigate = useNavigate();

  const [Textos, setTextos] = useState();
  const listaTextos = [
    "El sol brilla en el cielo azul y las nubes flotan suavemente como algodones de azúcar. El canto de los pájaros alegra el ambiente mientras la brisa acaricia mi rostro. Hoy es un buen día para mejorar mis habilidades de mecanografía.",
    "Había una vez un pequeño pueblo en lo profundo del bosque, donde todos se conocían y compartían momentos felices. Los niños jugaban en la plaza central mientras los adultos trabajaban en armonía. Sin embargo, una sombra amenazadora se cernía sobre ellos.",
    "El científico dedicado pasaba largas horas en su laboratorio, sumergido en sus experimentos. La búsqueda del conocimiento lo llevaba a descubrimientos fascinantes y a veces inesperados. La pasión por la ciencia lo impulsaba a seguir adelante.",
    "La travesía por el desierto era agotadora, pero el grupo de exploradores estaba decidido a llegar a la antigua ciudad perdida. Los oasis brindaban un breve respiro, pero también escondían peligros desconocidos.",
    "En la competencia de piano, la joven pianista mostraba su talento y pasión por la música clásica. Las notas fluían con gracia y emoción, dejando al público asombrado por su habilidad técnica y expresividad.",
    "La inteligencia artificial ha avanzado enormemente en los últimos años, abriendo un mundo de posibilidades en diversas industrias. Sin embargo, la ética en su desarrollo y aplicación sigue siendo un tema de debate.",
    "El arquitecto visionario diseñaba rascacielos impresionantes que se alzaban hacia el cielo como gigantes de acero y vidrio. Cada estructura era una obra maestra de ingeniería y estética.",
    "En el mundo virtual, los jugadores se sumergen en emocionantes aventuras llenas de acción y misterio. La realidad se desvanece mientras exploran mundos imaginarios con sus amigos.",
    "El océano profundo es un reino misterioso y fascinante. Las profundidades albergan criaturas extrañas y asombrosas que despiertan la curiosidad de científicos y exploradores.",
    "En la cumbre de la montaña más alta, los alpinistas experimentados enfrentan condiciones climáticas extremas y peligros inminentes. La determinación y la camaradería los impulsan hacia la cima.",
    "En la feria tecnológica, los ingenieros presentan invenciones innovadoras que revolucionarán la vida cotidiana. La imaginación se combina con la creatividad para dar forma al futuro.",
    "La investigación médica avanza hacia nuevas terapias y tratamientos para enfermedades complejas. La lucha contra el cáncer y otras dolencias es un camino arduo pero esperanzador.",
    "El detective perspicaz sigue las pistas meticulosamente en un caso de asesinato desconcertante. Cada detalle cuenta para desentrañar el misterio y llevar a los culpables ante la justicia.",
    "En el torneo de ajedrez, los grandes maestros compiten en partidas épicas de estrategia y táctica. La mente se convierte en el campo de batalla donde la astucia y el ingenio se despliegan.",
    "¡Felicidades! Has llegado al último texto de mecanografía. Demuestra tus habilidades escribiendo esta secuencia compleja de números y caracteres especiales: 3$Kp @9& zQ * w5.",
  ];

  const [selecionTexto, setSeleccionTexto] = useState(0);
  const [inputText, setInputText] = useState("");

  const [contador, setContador] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  useEffect(() => {
    loginUser({
      infoGame: [
        "--",
        "--",
        "--",
        "--",
        "--",
        "--",
        "--",
        "--",
        "--",
        "--",
        "--",
        "--",
        "--",
        "--",
        "--",
      ],
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
      .get("http://localhost:8000/juego/")
      .then(function (response) {
        response.data.sort((a, b) => a.dificultad - b.dificultad);
        setTextos(response.data);
        setJuego(response.data[0]);
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
  };


  const modInfoGame = () => {
    let listaPuntuaciones = user.infoGame;
    listaPuntuaciones.map((valor, index) => {
      if (index.toString() == selecionTexto.toString()) {
        listaPuntuaciones[index] = pmi;
      }
    });
    console.log(listaPuntuaciones)
    loginUser({...user, infoGame:listaPuntuaciones, das:"hola"})
  };

  return (
    <>
      <div className="game">
        <div className="centrador">
          <div className="titulo-home logo centrador">
            <p className="p1">Me</p>
            <p className="p2">can</p>
            <p className="p3">Ex</p>
          </div>
          <div className="centrador logo">Los 15 NIVELES</div>
        </div>
        <div className="contador-palabras-por-minuto ">
          Nivel: <b>{selecionTexto+1}</b> de <b>{listaTextos.length}</b>
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
        <InfoGame infoGame={user.infoGame} setInfoGame={loginUser} />
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
