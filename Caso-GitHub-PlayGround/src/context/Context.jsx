import { createContext, useEffect, useState, useReducer } from "react";

//1. Creación de funciones para obtener y setear datos en el storage
const getUserFromStorage = () => {
	const localData = localStorage.getItem("user");
	return localData ? JSON.parse(localData) : [];
};

console.log(getUserFromStorage());

const setUserInStorage = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
};

//2. Creación de un reducer para manipular la info y almacenarla en el estado

export const gitHubUseReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE_USER":
			// Validamos si el usuario es el mismo que ya tenemos almacenado
			const existingUser = state.username === action.payload.login;
			//Si es un usuario distinto, extraemos las propiedades que deseamos almacenar, y las guardamos en el estado
			if (!existingUser) {
				const { name, avatar_url, html_url, login } = action.payload;
				//Nuestro estado es un objeto con estas propiedades
				const newUser = { name, avatar_url, html_url, username: login };
				//En caso de que cambie el usuario seleccionado, actualizamos la info que se encuentre en el storage
				setUserInStorage(newUser);
				return newUser;
			}

			return state;
		default:
			return state;
	}
};

//3. Creamos el contexto
export const UserContext = createContext();

//4. Creamos el proveedor del contexto, que nos permitirá compartir dicho contexto a los componentes hijos

const UserContextProvider = ({ children }) => {
	//4.a Almacenamos la info del usuario para poder compartirla a nuestros componentes, siendo el valor inicial el obtenido del localStorage
	const [user, dispatch] = useReducer(
		gitHubUseReducer,
		{}, //Pasamos un objeto vacío, ya que lo inicializamos en forma diferida
		getUserFromStorage //pasamos la función para inicializar el estado en forma diferida
	);

	//4.b Si cambia el usuario, actualizamos la info en el storage
	useEffect(() => {
		setUserInStorage(user);
	}, [user]);

	//4.c Creamos una función para actualizar el usuario
	const changeUser = (user) => dispatch({ type: "CHANGE_USER", payload: user });

	return (
		//5. Compartimos el usuario y la función de actualización, para poder emplearla en los componentes dentro del contexto
		<UserContext.Provider value={{ user, changeUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
