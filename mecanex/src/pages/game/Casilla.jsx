import React, { useState } from 'react';
import './Game.css'

export const Casilla = (props) => {

    const { posicion, letraAsignada, inputText } = props;

    const [estadoCasilla, setEstadoCasilla] = useState(0);

    const getEstadoCasilla = () => {
        let classCasilla;
        if ((inputText.split('').length < posicion) || (inputText.split('')[posicion] === undefined)) {
            classCasilla = "-vacia"
        } else {
            if (letraAsignada === inputText.split('')[posicion]) {
                classCasilla = "-valida"
            } else {
                classCasilla = "-error"
            }
        }
        if (inputText.split('').length === posicion) {
            classCasilla=classCasilla+" casilla-index"
        }
        return classCasilla
    }

    return (
        <div className={"estadoCasilla" + getEstadoCasilla()+" casilla"} >{letraAsignada}</div>
    );
};
