// Importaciones:
import axios from 'axios'; 

// URL base
const url = 'http://localhost:8000';

// Tipos de acción
//Acciones de post
export const POST_USER = 'POST_USER';
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';

// Acción para crear un usuario
export function createUser(userData) {
	return async function (dispatch) {
		// Indicamos que estamos comenzando el proceso de creación del usuario
		dispatch({ type: CREATE_USER_REQUEST });

		try {
			// Obtener el token del localStorage para pasarlo en los headers
			const token = localStorage.getItem('token');

			const headers = {
				'x-token': token
			};

			// Realizar la petición para crear el usuario
			const response = await axios.post(`${url}/api/login`, userData, 
				{headers})

			// En caso de éxito, actualizar el estado de Redux con los datos del usuario creado
			dispatch({
				type: CREATE_USER_SUCCESS,
				payload: response.data,
			});

		} catch (error) {
			// Si ocurre un error, manejamos el fallo y enviamos el mensaje de error
			dispatch({
				type: CREATE_USER_FAIL,
				payload: error.response?.data?.message || 'Error al crear el usuario',
			});
		}
	};
}

