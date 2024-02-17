import React, { useEffect, useState } from "react";

const HomeProtected = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const token = sessionStorage.getItem("token");
                if (!token) {
                    throw new Error("No se encontró el token de acceso");
                }

                const response = await fetch(`${process.env.BACKEND_URL}/protected`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Error al obtener datos protegidos");
                }

                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Error al obtener datos protegidos:", error);
                // Maneja el error según tu requerimiento
            }
        };

        fetchProtectedData();
    }, []);

    return (
        <div>
            <h1>Bienvenido a su perfil</h1>
        </div>
    )
}
export default HomeProtected