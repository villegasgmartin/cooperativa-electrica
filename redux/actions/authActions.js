import axios from 'axios';

const url = 'http://localhost:8000';

export const LOGIN = 'LOGIN';

export function login(payload) {
	return async function (dispatch) {
		try {
			const info = await axios.post(`${url}/api/auth/login`, payload);
			const token = info.data.token;

			// Guardar token en localStorage
			localStorage.setItem('token', token);

			// Redirigir a dashboard
			window.location.href = '/dashboard';

			return dispatch({
				ok: true,
				type: LOGIN,
				payload: info.data
			});
		} catch (error) {
			// Obtener mensaje personalizado si el backend lo proporciona
			const errorMsg =
				error.response?.data?.msg ||
				error.response?.data?.message ||
				'Los datos ingresados no son correctos';

			// Lanzar error para manejarlo desde el componente (ej: Login.js)
			throw new Error(errorMsg);
		}
	};
}
