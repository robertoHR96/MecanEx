import React, { useEffect, useState, useRef } from 'react'
import { Casilla } from './Casilla';


export const Game = () => {

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

  const [Texto, setTexto] = useState("Lo más difícil de comenzar a digitar son las tildes, quita mucho tiempo pero toca... Después de eso lo más complicado son los signos de interrogación y exclamación.");

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
    let time = (cantidadPalabras / (valortime));
    setPmi(parseInt((time)));
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

  return (
    <div className='game'>
      <div className='centrador'>
        <div className='centrador logo'>
          MecaNex
        </div>
      </div>
      <div className='contador-palabras-por-minuto'>Palabras por minuto: <b>{pmi.toString()}</b></div>
      <div className='tablero'>
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
      <div className='centrador'>
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
        <div className='boton boton-siguiente'>Siguiente</div>
      </div>
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