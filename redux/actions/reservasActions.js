//Importaciones:
import dayjs from 'dayjs';

//URL:
//const url = 'https://panel-cooperativa-back-production.up.railway.app';
//Producción:
const url = 'http://localhost:8000';

// ==========================
// Tipos de acciones
// ==========================

//Acciones para obtener las reservas pendientes: 
export const GET_RESERVAS_REQUEST = 'GET_RESERVAS_REQUEST';
export const GET_RESERVAS_SUCCESS = 'GET_RESERVAS_SUCCESS';
export const GET_RESERVAS_FAILURE = 'GET_RESERVAS_FAILURE';
//Acciones para editar las reservas pendientes y eliminadas:
export const UPDATE_RESERVA_REQUEST = 'UPDATE_RESERVA_REQUEST';
export const UPDATE_RESERVA_SUCCESS = 'UPDATE_RESERVA_SUCCESS';
export const UPDATE_RESERVA_FAILURE = 'UPDATE_RESERVA_FAILURE';
//Acciones para marcar reserva como realizada:
export const MARK_RESERVA_REALIZADA_REQUEST = 'MARK_RESERVA_REALIZADA_REQUEST';
export const MARK_RESERVA_REALIZADA_SUCCESS = 'MARK_RESERVA_REALIZADA_SUCCESS';
export const MARK_RESERVA_REALIZADA_FAILURE = 'MARK_RESERVA_REALIZADA_FAILURE';
//Acciones para eliminar reserva:
export const DELETE_RESERVA_REQUEST = 'DELETE_RESERVA_REQUEST';
export const DELETE_RESERVA_SUCCESS = 'DELETE_RESERVA_SUCCESS';
export const DELETE_RESERVA_FAILURE = 'DELETE_RESERVA_FAILURE';
//Acciones para obtener reservas realizadas:
export const FETCH_RESERVAS_REALIZADAS_REQUEST = 'FETCH_RESERVAS_REALIZADAS_REQUEST';
export const FETCH_RESERVAS_REALIZADAS_SUCCESS = 'FETCH_RESERVAS_REALIZADAS_SUCCESS';
export const FETCH_RESERVAS_REALIZADAS_FAIL = 'FETCH_RESERVAS_REALIZADAS_FAIL';
// Acciones para obtener reservas eliminadas:
export const FETCH_RESERVAS_ELIMINADAS_REQUEST = 'FETCH_RESERVAS_ELIMINADAS_REQUEST';
export const FETCH_RESERVAS_ELIMINADAS_SUCCESS = 'FETCH_RESERVAS_ELIMINADAS_SUCCESS';
export const FETCH_RESERVAS_ELIMINADAS_FAIL = 'FETCH_RESERVAS_ELIMINADAS_FAIL';
//Acciones para marcar reserva como pendiente en Reservas Eliminadas:
export const MARCAR_RESERVA_PENDIENTE_REQUEST = 'MARCAR_RESERVA_PENDIENTE_REQUEST';
export const MARCAR_RESERVA_PENDIENTE_SUCCESS = 'MARCAR_RESERVA_PENDIENTE_SUCCESS';
export const MARCAR_RESERVA_PENDIENTE_FAILURE = 'MARCAR_RESERVA_PENDIENTE_FAILURE';
//Acciones para marcar reserva como pendiente en Reservas Completadas:
export const HANDLE_MARK_AS_PENDIENTE_REQUEST = 'HANDLE_MARK_AS_PENDIENTE_REQUEST';
export const HANDLE_MARK_AS_PENDIENTE_SUCCESS = 'HANDLE_MARK_AS_PENDIENTE_SUCCESS';
export const HANDLE_MARK_AS_PENDIENTE_FAILURE = 'HANDLE_MARK_AS_PENDIENTE_FAILURE';
//Acciones para eliminar las reservas completadas:
export const DELETE_RESERVA_COMPLETADA_REQUEST = 'DELETE_RESERVA_COMPLETADA_REQUEST';
export const DELETE_RESERVA_COMPLETADA_SUCCESS = 'DELETE_RESERVA_COMPLETADA_SUCCESS';
export const DELETE_RESERVA_COMPLETADA_FAILURE = 'DELETE_RESERVA_COMPLETADA_FAILURE';

//Función GET para obtener resrevas pendientes:
export const fetchReservas = () => async (dispatch) => {
    dispatch({ type: GET_RESERVAS_REQUEST });

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/api/reservas/reservas`, {
        headers: { 'x-token': token },
        });

        if (!response.ok) throw new Error('Error al obtener las reservas');

        const data = await response.json();
        const reservasFormateadas = data.reservas
        .filter(r => r.estadoBorrado === false)
        .map(r => {
            const fechaObj = dayjs(r.fecha);
            return {
            ...r,
            fechaFormateada: fechaObj.format('D [de] MMMM'),
            mes: fechaObj.format('MMMM'),
            horarioFormateado: `${r.horario.replace('-', 'hs a')}`,
            };
        });

        dispatch({ type: GET_RESERVAS_SUCCESS, payload: reservasFormateadas });
    } catch (error) {
        dispatch({ type: GET_RESERVAS_FAILURE, payload: error.message });
    }
};

//Función PUT para editar reservas:
export const updateReserva = (reservaActualizada) => async (dispatch) => {
    dispatch({ type: UPDATE_RESERVA_REQUEST });

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(
        `${url}/api/reservas/actualizar-reserva?id=${reservaActualizada._id}`,
        {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'x-token': token,
            },
            body: JSON.stringify(reservaActualizada),
        }
        );

        if (!response.ok) throw new Error('Error al actualizar la reserva');

        const formattedReserva = {
        ...reservaActualizada,
        fechaFormateada: dayjs(reservaActualizada.fecha).format('DD/MM'),
        mes: dayjs(reservaActualizada.fecha).format('MMMM'),
        };

        dispatch({ type: UPDATE_RESERVA_SUCCESS, payload: formattedReserva });
    } catch (error) {
        dispatch({ type: UPDATE_RESERVA_FAILURE, payload: error.message });
    }
};

//Función PUT para marcar como realizada:
export const markReservaAsRealizada = (reserva) => async (dispatch) => {
    dispatch({ type: MARK_RESERVA_REALIZADA_REQUEST });

    try {
        const token = localStorage.getItem('token');

        const updatedReserva = {
        ...reserva,
        estado: true,
        };

        const response = await fetch(
        `${url}/api/reservas/actualizar-reserva?id=${reserva._id}`,
        {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'x-token': token,
            },
            body: JSON.stringify(updatedReserva),
        }
        );

        if (!response.ok) throw new Error('Error al actualizar la reserva');

        dispatch({ type: MARK_RESERVA_REALIZADA_SUCCESS, payload: updatedReserva });
    } catch (error) {
        dispatch({ type: MARK_RESERVA_REALIZADA_FAILURE, payload: error.message });
    }
};

//Función PUT para eliminar reserva:
export const deleteReserva = (reservaId, nombreUsuario) => async (dispatch) => {
    dispatch({ type: DELETE_RESERVA_REQUEST });

    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${url}/api/reservas/actualizar-reserva?id=${reservaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token,
        },
        body: JSON.stringify({
            estadoBorrado: true,
            responsable: nombreUsuario,
        }),
        });

        if (!response.ok) throw new Error('Error al eliminar la reserva');

        dispatch({ type: DELETE_RESERVA_SUCCESS, payload: { id: reservaId } });

        dispatch(fetchReservas());
    } catch (error) {
        dispatch({ type: DELETE_RESERVA_FAILURE, payload: error.message });
    }
};

//Función GET para obtener reservas realizadas:
export const fetchReservasRealizadas = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_RESERVAS_REALIZADAS_REQUEST });

        try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/api/reservas/reservas-realizadas`, {
            headers: { 'x-token': token },
        });

        if (!response.ok) throw new Error('Error al obtener las reservas');

        const data = await response.json();
        const reservasFormateadas = data.reservas.map((r) => {
            const fechaObj = dayjs(r.fecha);
            return {
            ...r,
            fechaFormateada: fechaObj.format('D [de] MMMM'),
            mes: fechaObj.format('MMMM'),
            horarioFormateado: `${r.horario.replace('-', 'hs a')}`,
            };
        });
        
        dispatch({
            type: FETCH_RESERVAS_REALIZADAS_SUCCESS,
            payload: reservasFormateadas,
        });
        } catch (error) {
        dispatch({
            type: FETCH_RESERVAS_REALIZADAS_FAIL,
            payload: error.message || 'Error desconocido',
        });
        }
    };
};

// Función GET para obtener reservas eliminadas:
export const fetchReservasEliminadas = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_RESERVAS_ELIMINADAS_REQUEST });

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${url}/api/reservas/reservas`, {
                headers: { 'x-token': token },
            });

            if (!response.ok) throw new Error('Error al obtener las reservas');

            const data = await response.json();
            const reservasEliminadas = data.reservas
                .filter(r => r.estadoBorrado === true)
                .map(r => {
                    const fechaObj = dayjs(r.fecha);
                    return {
                        ...r,
                        fechaFormateada: fechaObj.format('D [de] MMMM'),
                        mes: fechaObj.format('MMMM'),
                        horarioFormateado: `${r.horario.replace('-', 'hs a')}`,
                    };
                });

            dispatch({ type: FETCH_RESERVAS_ELIMINADAS_SUCCESS, payload: reservasEliminadas });
        } catch (error) {
            dispatch({ type: FETCH_RESERVAS_ELIMINADAS_FAIL, payload: error.message });
        }
    };
};

//Función PUT para marcar reserva como pendiente en Reservas Elimindas
export const marcarReservaPendiente = (id) => async (dispatch) => {
    dispatch({ type: MARCAR_RESERVA_PENDIENTE_REQUEST });

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/api/reservas/actualizar-reserva?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token,
        },
        body: JSON.stringify({ estadoBorrado: false }),
        });

        if (!response.ok) throw new Error('Error al actualizar reserva');

        dispatch({ type: MARCAR_RESERVA_PENDIENTE_SUCCESS, payload: id });

    } catch (error) {
        dispatch({
        type: MARCAR_RESERVA_PENDIENTE_FAILURE,
        payload: error.message || 'Error desconocido',
        });
    }
};

//Función PUT para marcar una reserva como pendiente en Reservas Completadas:
export const handleMarkAsPendienteRedux = (reserva) => async (dispatch) => {
    dispatch({ type: HANDLE_MARK_AS_PENDIENTE_REQUEST });

    try {
        const token = localStorage.getItem('token');

        const updatedReserva = {
            ...reserva,
            estado: false,
            estadoBorrado: false,
        };

        const response = await fetch(`${url}/api/reservas/actualizar-reserva?id=${reserva._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token,
            },
            body: JSON.stringify(updatedReserva),
        });

        if (!response.ok) throw new Error('Error al actualizar la reserva');

        const formattedReserva = {
            ...updatedReserva,
            fechaFormateada: dayjs(updatedReserva.fecha).format('D [de] MMMM'),
            mes: dayjs(updatedReserva.fecha).format('MMMM'),
            horarioFormateado: `${updatedReserva.horario.replace('-', 'hs a')}`,
        };

        dispatch({ type: HANDLE_MARK_AS_PENDIENTE_SUCCESS, payload: formattedReserva });
    } catch (error) {
        dispatch({ type: HANDLE_MARK_AS_PENDIENTE_FAILURE, payload: error.message });
    }
};

//Función PUT para editar las reservas completadas:
export const updateReservaRealizada = (reserva) => async (dispatch) => {
    dispatch({ type: UPDATE_RESERVA_REQUEST });

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(
        `${url}/api/reservas/actualizar-reserva?id=${reserva._id}`,
        {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'x-token': token,
            },
            body: JSON.stringify(reserva),
        }
        );

        if (!response.ok) throw new Error('Error al actualizar la reserva');

        const formattedReserva = {
        ...reserva,
        fechaFormateada: dayjs(reserva.fecha).format('D [de] MMMM'),
        mes: dayjs(reserva.fecha).format('MMMM'),
        horarioFormateado: `${reserva.horario.replace('-', 'hs a')}`,
        };

        dispatch({ type: UPDATE_RESERVA_SUCCESS, payload: formattedReserva });
    } catch (error) {
        dispatch({ type: UPDATE_RESERVA_FAILURE, payload: error.message });
    }
};

//Función PUT para dar de baja una reserva realizada:
export const deleteReservaCompletada = (id) => async (dispatch) => {
    dispatch({ type: DELETE_RESERVA_COMPLETADA_REQUEST });

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/api/reservas/borrar-reserva?id=${id}`, {
        method: 'PUT',
        headers: {
            'x-token': token,
        },
        });

        if (!response.ok) throw new Error('Error al eliminar la reserva completada');

        dispatch({ type: DELETE_RESERVA_COMPLETADA_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_RESERVA_COMPLETADA_FAILURE, payload: error.message });
    }
};

