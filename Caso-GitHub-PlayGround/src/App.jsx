import "./App.css";
import { useContext, useState } from "react";
import {UserContext} from "./context/Context";

function App() {
	// 1. Accedemos al contexto creado
	const userContext = useContext(UserContext);

	// 2. Obtenemos la información del usuario y la función de actualización.
	// const { user, changeUser } = userContext;

	const user = userContext.user;
	const changeUser = userContext.changeUser;

	// 3. Creamos un estado para controlar el input que nos permitirá buscar un usuario de Github
	const [input, setInput] = useState(user.username);

	// 4. Vamos a tener un botón que nos permitirá buscar el usuario.
	// Para ello, creamos el controlador del evento "click", que se ocupará de obtener la data de la API de github e invocar a la función de actualización dentro de nuestro contexto.
	const onClick = async () => {
		const data = await fetch(`https://api.github.com/users/${input}`);
		const json = await data.json();

		// const { name, avatar_url, html_url, login } = json;

		// changeUser({ name, avatar_url, html_url, username:login });

		//Usando el useReducer, ya no debemos extraer las propiedades que deseamos almacenar (líneas comentadas arriba, porque el reducer ya se encarga de ello - verlo en el context)
		changeUser(json);
	};

	return (
		<div className="App">
			<h1>Perfil de Github</h1>
			<div>
				{/* Tendremos un input y un botón que nos permitirá buscar cualquier usuario de GH */}
				<input
					placeholder="Ingresa el nombre de usuario"
					defaultValue={user.username}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button onClick={onClick}>Ver Perfil</button>

				{/* Mostramos la información básica del usuario y un enlace a su perfil de GH*/}
				<section>
					<h3>{user.name}</h3>
					<h4>{user.username}</h4>
					<img src={user.avatar_url} alt={user.name} />
					<a href={user.html_url} target="_blank" rel="noreferrer">
						Ver perfil completo
					</a>
				</section>
			</div>
		</div>
	);
}

export default App;
