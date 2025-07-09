import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const resp = await fetch("https://curly-space-parakeet-5g5qgwqg6w5v2p4gx-3001.app.github.dev/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await resp.json();

            if (resp.ok) {
                sessionStorage.setItem("token", result.token);
                Swal.fire({
                    icon: "success",
                    title: "¡Bienvenido!",
                    text: "Inicio de sesión exitoso",
                    timer: 1500,
                    showConfirmButton: false
                });
                setTimeout(() => navigate("/private"), 1500);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Credenciales incorrectas",
                    text: "Verifica tu correo y contraseña.",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Error de red",
                text: "No se pudo conectar con el servidor.",
            });
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control" type="email" {...register("email", { required: true })} />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input className="form-control" type="password" {...register("password", { required: true })} />
                </div>
                <button className="btn btn-success" type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
