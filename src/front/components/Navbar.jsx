import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggle = () => setIsCollapsed(!isCollapsed);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">MI PAGINA</Link>

                {/* Botón burguer */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={handleToggle}
                    aria-controls="navbarNav"
                    aria-expanded={!isCollapsed}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menú colapsable */}
                <div className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Registro</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/private">Zona Privada</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
