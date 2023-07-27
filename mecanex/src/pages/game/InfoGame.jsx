import React from 'react'

export const InfoGame = (prop) => {
    const { infoGame, setInfoGame } = prop;
    return (<>
        <div className='title-info-game'>
            Puntuaciones
        </div>
        <div className='info-game'>
            {
                infoGame.map((valor, index) => (
                    <div className='data-info-game'>Juego <b>{index}</b>: <b>{valor}</b></div>
                ))
            }
        </div>
    </>)
}
