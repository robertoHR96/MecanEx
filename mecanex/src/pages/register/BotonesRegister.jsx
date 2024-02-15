import React from "react";

export const BotonesRegister = (props) => {

  const { botonIzq, textIzq, botonDer, textDer } = props;

  return (
    <div className="centrador-doble-hor-estric">
      <div
        className="button button-init centrador button-login"
        onClick={() => botonIzq()}
      >
              <b>{textIzq}</b>
      </div>
      <div
        className="button button-init centrador button-juego"
        onClick={() => botonDer()}
      >
              <b>{textDer}</b>
      </div>
    </div>
  );
};
