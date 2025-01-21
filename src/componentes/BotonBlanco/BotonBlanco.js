import React from "react";
import "./BotonBlanco.css";

function BotonBlanco({ texto, onClick, type = "button" }) {
  return (
    <button className="boton-blanco" onClick={onClick} type={type}>
      {texto}
    </button>
  );
}

export default BotonBlanco;
