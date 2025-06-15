import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

const Home = () => {
    const [message, setMessage] = useState(null);

    const loadMessage = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            if (!backendUrl) {
                throw new Error("VITE_BACKEND_URL is not definido en tu archivo .env");
            }

            const res = await fetch(`${backendUrl}/api/hello`);
            const data = await res.json();

            if (res.ok) {
                setMessage(data.message);
            } else {
                setMessage("No se pudo cargar el mensaje desde el backend.");
            }

        } catch (error) {
            setMessage("Error al conectar con el backend.");
            console.error(error);
        }
    };

    useEffect(() => {
        loadMessage();
    }, []);

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">HOLA MUNDO!</h1>
            <p className="lead">
                <img src="https://rciproducciones.wordpress.com/wp-content/uploads/2017/01/a540b0498bad80c0269f21900050c899.png" className="img-fluid rounded mb-3" alt="Rigo Baby" />
            </p>
            <div className="alert alert-info">
                {message ? (
                    <span>{message}</span>
                ) : (
                    <span className="text-danger">
                        Cargando mensaje desde el backend (asegúrate de que esté corriendo)...
                    </span>
                )}
            </div>
        </div>
    );
};

export default Home;
