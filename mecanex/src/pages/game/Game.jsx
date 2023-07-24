import React, { useEffect, useState, useRef } from 'react'
import { Casilla } from './Casilla';


export const Game = () => {

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
    "¡Felicidades! Has llegado al último texto de mecanografía. Demuestra tus habilidades escribiendo esta secuencia compleja de números y caracteres especiales: 3$Kp @9& zQ * w5."
  ];

  const [selecionTexto, setSeleccionTexto] = useState(0);
  const [inputText, setInputText] = useState("")

  const [contador, setContador] = useState(0);
  const [corriendo, setCorriendo] = useState(false);

  useEffect(() => {
    let intervalo;

    if (corriendo) {
      intervalo = setInterval(() => {
        setContador((prevContador) => prevContador + 1);
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [corriendo]);

  const iniciarContador = () => {
    setCorriendo(true);
  };

  const detenerContador = () => {
    setCorriendo(false);
  };

  const [Texto, setTexto] = useState(listaTextos[selecionTexto]);

  const [pmi, setPmi] = useState(0);

  const calculadorPMI = () => {
    let textoSplit = Texto.split(' ');
    let inputTextSplit = inputText.split(' ');
    let cantidadPalabras = 0;
    inputTextSplit.map((palabra, index) => {
      (palabra === textoSplit[index] && cantidadPalabras++);
    });
    let valortime = (contador / 60);
    if (valortime < 0) {
      valortime = 1
    }
    let time = parseInt(cantidadPalabras / (valortime));
    if (time != isNaN) {
    setPmi(time);
    }
  };

  const [finGame, setFinGame] = useState(false);

  const finDelJuego = () => {
    setFinGame(true);
    detenerContador();
  }

  useEffect(() => {
    (inputText === Texto) ? (finDelJuego()) : setFinGame(false);
    // Llamamos al calculador de PMI
    calculadorPMI();
  }, [inputText]);

  const inputRef = useRef(null);

  useEffect(() => {
    // En el montaje del componente, enfocamos el input automáticamente
    inputRef.current.focus();
    // Iniciamo el contador de tiempo, para calcular la velocidad de escritura
    iniciarContador();
  }, []);

  useEffect(() => {
    setTexto(listaTextos[selecionTexto]);
  }, [selecionTexto])

  const [claseTablero, setClaseTablero] = useState("tablero-inicio");

  const siguienteJuego = () => {
    if (finGame) {
      detenerContador();
      setContador(0);
      setCorriendo(false);
      setClaseTablero("tablero-fin")
      setTimeout(() => {
        setInputText("");
        setPmi(0);
        setFinGame(false);
        // En el montaje del componente, enfocamos el input automáticamente
        inputRef.current.focus();
        // Iniciamo el contador de tiempo, para calcular la velocidad de escritura
        setSeleccionTexto((selecionTexto + 1));
        setClaseTablero("tablero-inicio")
      }, 365);
      iniciarContador();
    }
  }

  return (
    <div className='game'>
      <div className='centrador'>
        <div className='centrador logo'>
          MecaNex
        </div>
      </div>
      <div className='contador-palabras-por-minuto '>Nivel: <b>{selecionTexto}</b> de <b>{listaTextos.length}</b></div>
      {
      <div className='contador-palabras-por-minuto '>Palabras por minuto: <b>{pmi}</b></div>
      }
      <div className={'tablero ' + claseTablero}>
        {
          Texto.split(/(?!^)/)
            .map(item => (item.trim() === '' ? ' ' : item))
            .map((letra, index) => (
              <Casilla
                posicion={index}
                letraAsignada={letra}
                inputText={inputText}
              />
            ))
        }
      </div>
      <div className='centrador content-inputText-game'>
        <input
          type='text'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className='inputText-game'
          ref={inputRef}
        />
      </div>
      <div className='botones-navegacion-game'>
        <div className='boton boton-anterior'>Atras</div>
        <div className='boton boton-siguiente' onClick={() => siguienteJuego()}>Siguiente</div>
      </div>
      <div className='texto-informacion'>En esta lista, los textos comienzan con oraciones más simples y cortas, con un vocabulario y estructura más fácil de digitar. A medida que avanzas en la lista, los textos se vuelven progresivamente más largos y complejos, lo que requerirá un mayor nivel de habilidad y velocidad en la mecanografía.</div>
      <div className='modal-finGame'>
        {
          (finGame) && <div className='centrador'>Enorabuena !!</div>
        }
      </div>
    </div>
  )
}
/*

          <Casilla
            posicion={index}
            letraAsignada={letra}
            inputText={inputText}
          />
*/