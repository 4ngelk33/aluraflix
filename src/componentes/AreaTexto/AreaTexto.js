import React from "react";
import "./AreaTexto.css"; 

function AreaTexto({ valor, placeholder, onChange, label }) {
  return (
    <div className="area-texto-container">
      <label>{label}:</label>
      <textarea
        placeholder={placeholder}
        value={valor}
        onChange={onChange}
        className="area-texto"
      />
    </div>
  );
}

export default AreaTexto;
