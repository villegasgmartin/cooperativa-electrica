//Importaciones:
import axios from 'axios';

//URL:
//const url = 'https://cooperativaback.up.railway.app';
//Development:
const url = 'http://localhost:8000';

// ==========================
// Tipos de acciones
// ==========================

//Login:
export const LOGIN = 'LOGIN';
// Logout:
export const LOGOUT = 'LOGOUT';
// Recuperar contraseña:
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';
//Resetear contraseña:
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL';

//Función POST para iniciar sesión:
export function login(payload) {
	return async function (dispatch) {
		try {
		const response = await axios.post(`${url}/api/auth/login`, payload);

		const { token, usuario } = response.data;
		const userId = usuario.uid;

		localStorage.setItem('token', token);
		localStorage.setItem('userId', userId);

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

// Función POST para enviar enlace de recuperación de contraseña:
export function forgotPassword(email) {
	return async function (dispatch) {
		try {
			await axios.post(`${url}/api/auth/nueva-password`, {
				email,
			});

			dispatch({
				type: FORGOT_PASSWORD_SUCCESS,
				payload: 'Se envió un enlace para restablecer tu contraseña',
			});
		} catch (error) {
			dispatch({
				type: FORGOT_PASSWORD_FAIL,
				payload: error.response?.data?.msg || 'Error al enviar el correo. Verifica el email.',
			});
		}
	};
}

// Función PUT para restablecer contraseña:
export function resetPassword(token, newPassword) {
	return async function (dispatch) {
		try {
		await axios.put(`${url}/api/auth/actualizar-clave?token=${token}`, {
			password: newPassword,
		});

		dispatch({
			type: RESET_PASSWORD_SUCCESS,
		});
		} catch (error) {
		dispatch({
			type: RESET_PASSWORD_FAIL,
			payload: error.response?.data?.msg || 'Error al actualizar la contraseña',
		});
		}
	};
}

//Función GET para cerrar sesión:
export function logout() {
	return async function (dispatch) {
		try {
			const token = localStorage.getItem('token');

			await axios.get(`${url}/api/auth/logout`, {
				headers: {
					'x-token': token,
				},
			});

			localStorage.removeItem('token');
			localStorage.removeItem('userId');

			dispatch({
				type: LOGOUT,
			});

			window.location.href = '/login';
		} catch (error) {
			console.error('Error al cerrar sesión:', error);
		}
	};
}
