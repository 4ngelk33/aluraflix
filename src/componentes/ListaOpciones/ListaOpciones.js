import React from "react";
import "./ListaOpciones.css";

function ListaOpciones({ label, options, value, onChange }) {
  return (
    <div className="lista-opciones">
      <label>{label}:</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          Seleccionar opción
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ListaOpciones;
