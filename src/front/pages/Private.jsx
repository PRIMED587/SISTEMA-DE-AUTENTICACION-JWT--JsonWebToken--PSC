import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/");
    };

   return (
  <div className="private-container">
    <h2 className="secret-title">Bienvenido a la zona privada</h2>
    <p className="secret-description">
      Aca puedes relajarte y pasarla bien con musica si dejas correr el video.
    </p>
    <div className="video-wrapper">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/ZsCGg6fKYbg?start=1004&autoplay=1&mute=1"
        title="Zona Secreta"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

};

export default Private;
