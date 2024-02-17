const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			registerUser: async (email, password) => {
				try {
                    const response = await fetch(`${process.env.BACKEND_URL}/signUp`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (!response.ok) {
                        throw new Error("Error al registrar usuario");
                    }
					const data = await response.json();
					return data
				} catch{
					console.error("Error al registrar usuario:", error);
                    throw new error;
				}

			},
			login: async (email, password) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (!response.ok) {
                        throw new Error("Error al iniciar sesión");
                    }

                    const data = await response.json();

                    // Almacenar el token de acceso en sessionStorage
                    sessionStorage.setItem("token", data.token);

                    return data;
                } catch (error) {
                    console.error("Error al iniciar sesión:", error);
                    throw error;
                }
            },
			fetchProtectedData: async () => {
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
					return data;
				} catch (error) {
					console.error("Error al obtener datos protegidos:", error);
					throw error;
				}
			},
		}
	};
};

export default getState;
