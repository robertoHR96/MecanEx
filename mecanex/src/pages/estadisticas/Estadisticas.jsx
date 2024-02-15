import React from "react";
import { ElemenIJ } from "../home/ElemenIJ";
export const Estadisticas = () => {
  return (
    <div className="estadisticas">
      <div className="info-jugador">
        <ElemenIJ doble={true} title="Data Jugador" content="Hola como estas" />
        <ElemenIJ title="Data Jugador" content="Hola como estas" />
        <ElemenIJ
          title="Data Jugador"
          content="Hola como estas \n asdfadsfaaaaaa
          aksdjfpiasbdvpiu qbdvs piahsdvpaj svs dvahdsv opiah dsvpiahsdv iua dsvpjiasdv asdiohvj aoisdhv0qu ihwvd 8uqh edvuahd svouhas dpivuhasd
          SVHAPISDJV HAKSJDHVA LKJSVDH ALKSJ HJHAPij hdivjhFPIHp iuhPIUH pihFPIUhp iufhpiASUFH ipasfc AUH aisufchiuASF iu as iuASDIU i OIu hsoiuhA
          .forEach(element => {
            
          });
          "
        />
        <ElemenIJ title="Data Jugador" content="Hola como estas" />
        <ElemenIJ title="Data Jugador" content="Hola como estas" />
        <ElemenIJ doble={true} title="Data Jugador" content="Hola como estas" />
      </div>
    </div>
  );
};
