import React from "react";
import "./ModalVideo.css";

function ModalVideo({ video, mostrar, cerrarModal }) {
  if (!mostrar || !video) return null;

  const videoLink = transformarLinkYouTube(video.videoRuta); 

  if (!videoLink) {
    return (
      <div className="modal">
        <button className="cerrar" onClick={cerrarModal}>
          ×
        </button>
        <p>El enlace del video no es válido.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overlay" onClick={cerrarModal}></div>
      <div className="modal">
        <button className="cerrar" onClick={cerrarModal}>
          ×
        </button>
        <h2 className="modal-title">{video.titulo}</h2>
        <div className="video-frame-container">
          <iframe
            src={videoLink} 
            title={video.titulo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-frame"
          ></iframe>
        </div>
      </div>
    </>
  );
}

const transformarLinkYouTube = (url) => {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

export default ModalVideo;
