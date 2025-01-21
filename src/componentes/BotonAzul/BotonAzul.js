import React from "react";
import "./BotonAzul.css";

function BotonAzul({ texto, onClick, type = "button" }) {
  return (
    <button className="boton-azul" onClick={onClick} type={type}>
      {texto}
    </button>
  );
}

export default BotonAzul;
