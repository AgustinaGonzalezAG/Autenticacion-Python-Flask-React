import React from "react";


export const Navbar = () => {
	const handleLogout = () => {
        // Eliminar el token de autenticación del sessionStorage
        sessionStorage.removeItem("token");
        window.location.href = "/login";
    };
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			
				<div className="ml-auto">
					
						<button className="btn btn-primary" onClick={handleLogout}>Cerrar sesion</button>
					
				</div>
			</div>
		</nav>
	);
};
