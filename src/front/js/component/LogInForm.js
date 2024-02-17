
import React, { useState, useContext } from "react";
import { Context } from "./../store/appContext";
import { useNavigate } from "react-router-dom";

const LogInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);
	const navigate = useNavigate()

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const data = await actions.login(email, password);
            console.log("Inicio de sesión exitoso:", data);
			navigate("/protected");
            
          
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5 mb-5" style={{ width: "50%", margin: "0 auto", background: "#C6C6C6", padding: "20px" }}>
            <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-4">Iniciar sesión</h3>
                <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email address" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="d-flex flex-column justify-content-center">
                    <button type="submit" className="btn btn-success" style={{ width: "100%" }}>Iniciar sesión</button>
                    <a href="/signup" style={{ margin: "0 auto" }}>Crear una cuenta</a>
                </div>
            </form>
        </div>
    );
};

export default LogInForm;
