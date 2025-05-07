//Importaciones:
import axios from 'axios';

//JSX:
const url = 'https://cooperativaback.up.railway.app';

export const LOGIN = 'LOGIN';

export function login(payload) {
	return async function (dispatch) {
		try {
		const response = await axios.post(`${url}/api/auth/login`, payload);

		const { token, usuario } = response.data;
		const userId = usuario.uid;


		// Guardar token y userId en localStorage
		localStorage.setItem('token', token);
		localStorage.setItem('userId', userId);

    // Redirigir a dashboard
	window.location.href = '/dashboard';

		return dispatch({
			ok: true,
			type: LOGIN,
			payload: response.data,
		});
		} catch (error) {
		const errorMsg =
			error.response?.data?.msg ||
			error.response?.data?.message ||
			'Los datos ingresados no son correctos';

		throw new Error(errorMsg);
		}
	};
}
