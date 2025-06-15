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
        <div className="container mx-auto">
            <img src="https://thumbs.dreamstime.com/b/marca-de-rect%C3%A1ngulo-grungo-negro-zona-secreta-superior-signo-sello-grungy-205333340.jpg" alt="Descripción de la imagen" width="500" height="200"/>
            <div className="Textzone m-auto">
            <h2>Bienvenido a la zona privada</h2>
            <p>Solo los usuarios autenticados pueden ver esto.Todos los secretos del mundo estan guardados aqui</p>
            </div>
        </div>
    );
}

export default Private