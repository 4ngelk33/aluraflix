import React, { useState } from "react";
import "./Formulario.css";
import BotonBlanco from "../BotonBlanco/BotonBlanco";
import FormularioVideo from "../FormularioVideo/FormularioVideo";
import ModalVideo from "../ModalVideo/ModalVideo";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function Formulario() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tipoFormulario, setTipoFormulario] = useState("crear");
  const [videoAEditar, setVideoAEditar] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [videos, setVideos] = useState([]);
  const [coloresCategorias, setColoresCategorias] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [videoSeleccionado, setVideoSeleccionado] = useState(null);

  const generarColorAleatorio = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const videosPorCategoria = videos.reduce((grupo, video) => {
    const { categoria } = video;
    if (!grupo[categoria]) {
      grupo[categoria] = [];
      if (!coloresCategorias[categoria]) {
        setColoresCategorias((prev) => ({
          ...prev,
          [categoria]: generarColorAleatorio(),
        }));
      }
    }
    grupo[categoria].push(video);
    return grupo;
  }, {});

  const eliminarVideo = (videoTitulo) => {
    const nuevosVideos = videos.filter((video) => video.titulo !== videoTitulo);
    setVideos(nuevosVideos);
  };

  const editarVideo = (video) => {
    setTipoFormulario("editar");
    setVideoAEditar(video);
    setMostrarFormulario(true);
  };

  const abrirModal = (video) => {
    setVideoSeleccionado(video);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setVideoSeleccionado(null);
  };

  return (
    <header className="header">
      <div className="navbar">
        <img src={`${process.env.PUBLIC_URL}/img/LogoMain.png`} alt="Logo" className="logo" />
        <div className="menu">
          <BotonBlanco texto="Nuevo Video" onClick={() => setMostrarFormulario(true)} />
        </div>
      </div>

      <img src={`${process.env.PUBLIC_URL}/img/BannerMain.png`} alt="BannerMain" className="banner" />

      {mostrarFormulario && (
        <FormularioVideo
          mostrar={mostrarFormulario}
          setMostrar={setMostrarFormulario}
          tipo={tipoFormulario}
          categorias={categorias}
          setCategorias={setCategorias}
          setVideos={setVideos}
          videoAEditar={videoAEditar}
          setVideoAEditar={setVideoAEditar}
        />
      )}

      <div className="videos-container">
        {Object.keys(videosPorCategoria).length === 0 ? (
          <p>No hay videos registrados.</p>
        ) : (
          Object.keys(videosPorCategoria).map((categoria) => {
            const colorCategoria = coloresCategorias[categoria];

            return (
              <div key={categoria} className="categoria-section">
                <h3
                  className="categoria-titulo"
                  style={{ backgroundColor: colorCategoria }}
                >
                  {categoria}
                </h3>

                <div className="cards-container">
                  {videosPorCategoria[categoria].map((video, index) => (
                    <div
                      key={index}
                      className="card"
                      style={{
                        borderColor: colorCategoria,
                        boxShadow: `0 0 15px 2px ${colorCategoria}`,
                      }}
                      onClick={() => abrirModal(video)}
                    >
                      <img
                        src={video.imagen || "/img/LogoMain.png"}
                        alt={video.titulo}
                        className="card-imagen"
                      />

                      <div className="card-contenido">
                        <div className="card-titulo">{video.titulo}</div>
                        <div className="card-acciones">
                          <button
                            className="accion-btn editar"
                            onClick={(e) => {
                              e.stopPropagation();
                              editarVideo(video);
                            }}
                          >
                            <FaEdit /> Editar
                          </button>
                          <button
                            className="accion-btn borrar"
                            onClick={(e) => {
                              e.stopPropagation();
                              eliminarVideo(video.titulo);
                            }}
                          >
                            <FaTrashAlt /> Borrar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="footer">
        <img src={`${process.env.PUBLIC_URL}/img/LogoMain.png`} alt="Logo" className="logo" />
        <p className="titulo-footer">Desarrollado por Angel Rios © 2025</p>
      </div>

      <ModalVideo
        video={videoSeleccionado}
        mostrar={modalVisible}
        cerrarModal={cerrarModal}
      />
    </header>
  );
}

export default Formulario;
