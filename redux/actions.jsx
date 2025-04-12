const url = 'http://localhost:8080';

// const urlHome = 'https://parkingsystem.up.railway.app/'
import axios from 'axios'; 

 
export const POST_USER = 'POST_USER'
export const LOGIN = 'LOGIN';

export function login(payload) {
	return async function (dispatch) {
		try {
			const info = await axios.post(`${url}/api/auth/login`, payload);
			console.log(info);

			const token = info.data.token;

			// Guardar token en localStorage si lo necesitás luego
			localStorage.setItem('token', token);
			window.location.href = '/dashboard';

			return dispatch({
				ok: true,
				type: LOGIN,
				payload: info.data
			});
		} catch (error) {
			alert('Los datos ingresados no son correctos');
			console.log(error);
		}
	};
}