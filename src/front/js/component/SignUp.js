import React, {useState, useContext} from "react"
import { Context } from "./../store/appContext"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const {store, actions} = useContext(Context)
	const navigate = useNavigate()

	const handleSubmit = async event => {
        event.preventDefault(); // Evita que se recargue la página al enviar el formulario

        try {
            const data = await actions.registerUser(email, password);
            console.log("Usuario registrado exitosamente:", data);
			navigate("/login")
            
        } catch (error) {
            console.error("Error al registrar usuario:", error);
           
        }
    };

    return(
        <div className="d-flex justify-content-center mt-5 mb-5" style={{ width: "50%", margin: "0 auto", background: "#C6C6C6", padding: "20px" }}>
            <form onSubmit={handleSubmit}> 
                <h3 className="text-center mb-4">Registrarme</h3>
                <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email address" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} /> 
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /> 
                </div>
                <div className="d-flex flex-column justify-content-center">
                    <button type="submit" className="btn btn-success mb-2" style={{ width: "100%" }}>Registrarme</button>
                    <a href="/login" style={{ margin: "0 auto" }}>Ya tengo cuenta</a>
                </div>
            </form>
        </div>
    )
}
export default SignUp