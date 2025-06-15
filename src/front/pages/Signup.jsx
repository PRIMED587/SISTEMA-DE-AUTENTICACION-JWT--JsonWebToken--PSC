import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Signup = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            const resp = await fetch("https://curly-invention-q76q7wq7wqx63xrvj-3001.app.github.dev/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (resp.ok) {
                setSuccessMessage("Usuario registrado satisfactoriamente");
                setTimeout(() => {
                    navigate("/login"); // Asegúrate que esta ruta está definida
                }, 2000);
            } else {
                alert("Error al registrar usuario.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registro</h2>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
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
