import React, { useEffect, useState } from 'react'
import { Casilla } from './Casilla';


export const Game = () => {

  const [inputText, setInputText] = useState("")

  const [Texto, setTexto] = useState("Lo más difícil de comenzar a digitar son las tildes, quita mucho tiempo pero toca... Después de eso lo más complicado son los signos de interrogación y exclamación."
    .split(/(?!^)/)
    .map(item => (item.trim() === '' ? ' ' : item))
  );

  useEffect(() => {
    console.log(Texto)
  }, [])

  return (
    <div className='game'>
      <div className='centrador'>
        <div className='centrador logo'>
          MecaNex
        </div>
      </div>
      <div className='tablero'>
        {
          Texto.map((letra, index) => (
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
        />
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