import React, { useState, useEffect } from "react";
import "./FormularioVideo.css";
import BotonAzul from "../BotonAzul/BotonAzul";
import BotonBlanco from "../BotonBlanco/BotonBlanco";
import CampoTexto from "../CampoTexto/CampoTexto";
import AreaTexto from "../AreaTexto/AreaTexto";
import ListaOpciones from "../ListaOpciones/ListaOpciones";
import FormularioCategorias from "../FormularioCategorias/FormularioCategorias";
import { FaEdit } from "react-icons/fa";

function FormularioVideo({
  mostrar,
  setMostrar,
  tipo,
  categorias,
  setCategorias,
  setVideos,
  videoAEditar,
  setVideoAEditar,
}) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [videoRuta, setVideoRuta] = useState("");
  const [mostrarCategoriasModal, setMostrarCategoriasModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tipo === "editar" && videoAEditar) {
      setTitulo(videoAEditar.titulo);
      setCategoria(videoAEditar.categoria);
      setDescripcion(videoAEditar.descripcion);
      setImagen(videoAEditar.imagen);
      setVideoRuta(videoAEditar.videoRuta);
    }
  }, [tipo, videoAEditar]);

  const validarCampos = () => {
    if (!titulo || !categoria || !descripcion || !imagen || !videoRuta) {
      setError("Todos los campos son obligatorios.");
      return false;
    }
    setError("");
    return true;
  };

  const handleGuardar = () => {
    if (!validarCampos()) return;

    const nuevoVideo = {
      titulo,
      categoria,
      descripcion,
      imagen,
      videoRuta,
    };

    if (tipo === "crear") {
      setVideos((prevVideos) => [...prevVideos, nuevoVideo]);
    } else if (tipo === "editar") {
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.titulo === videoAEditar.titulo ? nuevoVideo : video
        )
      );
    }

    setMostrar(false);
    setVideoAEditar(null);
  };

  const handleLimpiar = () => {
    setTitulo("");
    setCategoria("");
    setDescripcion("");
    setImagen("");
    setVideoRuta("");
    setError("");
  };

  return (
    <>
      {mostrar && (
        <>
          <div className="overlay" onClick={() => setMostrar(false)}></div>
          <div className="formulario-popup">
            <button className="cerrar" onClick={() => setMostrar(false)}>
              &times;
            </button>

            <h2>TARJETA DE VIDEO</h2>
            <p>Complete el formulario para registrar la tarjeta de video</p>

            {error && <p className="error-message">{error}</p>}

            <form>
              <div className="campo-container">
                <CampoTexto
                  label="Título"
                  tipo="text"
                  placeholder="Ingrese el título"
                  valor={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>

              <div className="campo-container">
                <CampoTexto
                  label="Ruta de la imagen"
                  tipo="text"
                  placeholder="Ingrese la ruta de la imagen"
                  valor={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                />
              </div>

              <div className="campo-container">
                <CampoTexto
                  label="Ruta del video"
                  tipo="text"
                  placeholder="Ingrese la ruta del video"
                  valor={videoRuta}
                  onChange={(e) => setVideoRuta(e.target.value)}
                />
              </div>

              <div className="campo-container">
                <AreaTexto
                  label="Descripción"
                  placeholder="Ingrese la descripción"
                  valor={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              <div className="campo-container">
                <ListaOpciones
                  label="Categoría"
                  options={categorias}
                  value={categoria}
                  onChange={setCategoria}
                />
                <button
                  type="button"
                  className="boton-icono"
                  onClick={() => setMostrarCategoriasModal(true)}
                >
                  <FaEdit />
                  Gestionar Categorías
                </button>
              </div>

              <div className="botones-container">
                <BotonAzul texto="Guardar" onClick={handleGuardar} />
                <BotonBlanco texto="Limpiar" onClick={handleLimpiar} />
              </div>
            </form>
          </div>
        </>
      )}

      <FormularioCategorias
        mostrar={mostrarCategoriasModal}
        setMostrar={setMostrarCategoriasModal}
        categorias={categorias}
        setCategorias={setCategorias}
      />
    </>
  );
}

export default FormularioVideo;
