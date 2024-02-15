import React from "react";

export const ElemenIJ = ({ doble = false, title, content }) => {
  const tipo = () => {
    if (doble == true) {
      return "elemento-info-jugador elemento-doble";
    } else {
      return "elemento-info-jugador";
    }
  };
  return (
    <div className={tipo()}>
      <div className="title-elemento-info-jugador">{title}</div>
      <div className="content-elemento-info-jugador">
        <p>{content}</p>
      </div>
    </div>
  );
};
