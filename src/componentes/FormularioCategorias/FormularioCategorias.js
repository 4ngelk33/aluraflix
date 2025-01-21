import React, { useState } from "react";
import "./FormularioCategorias.css";
import BotonAzul from "../BotonAzul/BotonAzul";
import BotonBlanco from "../BotonBlanco/BotonBlanco";
import { FaEdit, FaTrash } from "react-icons/fa"; 

function FormularioCategorias({ mostrar, setMostrar, categorias, setCategorias }) {
  const [categoria, setCategoria] = useState("");
  const [editarCategoria, setEditarCategoria] = useState(null);

  const handleAgregar = () => {
    if (categoria && !categorias.includes(categoria)) {
      setCategorias([...categorias, categoria]);
      setCategoria("");
    }
  };

  const handleEditar = (categoriaEditar) => {
    setEditarCategoria(categoriaEditar);
    setCategoria(categoriaEditar); 
  };

  const handleGuardarEdicion = () => {
    if (categoria) {
      const categoriasActualizadas = categorias.map((cat) =>
        cat === editarCategoria ? categoria : cat
      );
      setCategorias(categoriasActualizadas);
      setCategoria(""); 
      setEditarCategoria(null); 
    }
  };

  const handleEliminar = (categoriaEliminar) => {
    setCategorias(categorias.filter(categoria => categoria !== categoriaEliminar));
  };

  const handleCerrar = () => {
    setMostrar(false);
  };

  return (
    <>
      {mostrar && (
        <>
          <div className="overlay" onClick={handleCerrar}></div>
          <div className="categorias-modal">
            <button className="cerrar" onClick={handleCerrar}>
              &times;
            </button>

            <h2>Gestionar Categorías</h2>
            <input
              type="text"
              placeholder="Nueva Categoría"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
            <div className="botones-container">
              {editarCategoria ? (
                <BotonAzul texto="Guardar Edición" onClick={handleGuardarEdicion} />
              ) : (
                <BotonAzul texto="Agregar" onClick={handleAgregar} />
              )}
              <BotonBlanco texto="Cerrar" onClick={handleCerrar} />
            </div>
            <div className="lista-categorias">
              <h3>Categorías Actuales</h3>
              <ul>
                {categorias.map((cat, index) => (
                  <li key={index}>
                    {cat}
                    <div className="acciones">
                      <FaEdit
                        className="icono-editar"
                        onClick={() => handleEditar(cat)} 
                      />
                      <FaTrash
                        className="icono-eliminar"
                        onClick={() => handleEliminar(cat)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FormularioCategorias;
