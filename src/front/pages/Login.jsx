import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const resp = await fetch("https://jwt-sistema-autenticacion-psc.onrender.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await resp.json();

            if (resp.ok) {
                sessionStorage.setItem("token", result.token);
                navigate("/private");
            } else {
                alert("Credenciales inválidas");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-5">
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
}

export default Login