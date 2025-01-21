import React from "react";
import "./CampoTexto.css";

function CampoTexto({ tipo, valor, placeholder, onChange, label }) {
  return (
    <div className="campo-texto-container">
      <label>{label}:</label>
      <input
        type={tipo || "text"}
        placeholder={placeholder}
        value={valor}
        onChange={onChange}
        className="campo-texto"
      />
    </div>
  );
}

export default CampoTexto;
