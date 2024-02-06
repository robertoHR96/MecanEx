import React from 'react'

export const InfoGame = (prop) => {
    const { Textos } = prop;
    return (
      <>
        <div className="title-info-game">Puntuaciones</div>
        <div className="info-game">
          {
            Textos.map((valor) => (
              <div className="data-info-game">
                Juego <b>{valor.juego }</b>: <b>{valor.puntuacion}</b>
              </div>
            ))}
        </div>
      </>
    );
}
