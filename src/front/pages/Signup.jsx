import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

   const onSubmit = async (data) => {
    try {
        const resp = await fetch(`${backendUrl}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await resp.json();

        if (resp.ok) {
            Swal.fire({
                icon: "success",
                title: "¡Registrado!",
                text: "Usuario registrado satisfactoriamente",
                timer: 2000,
                showConfirmButton: false
            });
            setTimeout(() => navigate("/login"), 2000);
        } else if (result.msg?.toLowerCase().includes("ya se encuentra registrado")) {
            Swal.fire({
                icon: "warning",
                title: "Correo ya registrado",
                text: result.msg,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: result.msg || "No se pudo registrar el usuario.",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Error de red",
            text: "Ocurrió un error al conectar con el servidor.",
        });
    }
};
    return (
        <div className="container mt-5 mb-5">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control" type="email" {...register("email", { required: true })} />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input className="form-control" type="password" {...register("password", { required: true })} />
                </div>
                <button className="btn btn-primary" type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Signup;
