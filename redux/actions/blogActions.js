//Importaciones:
import axios from 'axios';

//URL:

//const url = 'https://panel-cooperativa-back-production.up.railway.app';

//Producción:
const url = 'http://localhost:8000';


// ==========================
// Tipos de acciones
// ==========================

    //Acciones para homeBog:
export const FETCH_HOMEBLOGS_REQUEST = 'FETCH_HOMEBLOGS_REQUEST';
export const FETCH_HOMEBLOGS_SUCCESS = 'FETCH_HOMEBLOGS_SUCCESS';
export const FETCH_HOMEBLOGS_FAIL = 'FETCH_HOMEBLOGS_FAIL';
    //Acciones para página principal Blogs:
export const FETCH_ALL_BLOGS_REQUEST = 'FETCH_ALL_BLOGS_REQUEST';
export const FETCH_ALL_BLOGS_SUCCESS = 'FETCH_ALL_BLOGS_SUCCESS';
export const FETCH_ALL_BLOGS_FAIL = 'FETCH_ALL_BLOGS_FAIL';
    //Acciones para la noticia individual:
export const FETCH_SINGLE_BLOG_REQUEST = 'FETCH_SINGLE_BLOG_REQUEST';
export const FETCH_SINGLE_BLOG_SUCCESS = 'FETCH_SINGLE_BLOG_SUCCESS';
export const FETCH_SINGLE_BLOG_FAIL = 'FETCH_SINGLE_BLOG_FAIL';
    //Acciones para crear el blog:
export const CREATE_BLOG_REQUEST = 'CREATE_BLOG_REQUEST';
export const CREATE_BLOG_SUCCESS = 'CREATE_BLOG_SUCCESS';
export const CREATE_BLOG_FAIL = 'CREATE_BLOG_FAIL';
    // Para editar blog
export const UPDATE_BLOG_REQUEST = 'UPDATE_BLOG_REQUEST';
export const UPDATE_BLOG_SUCCESS = 'UPDATE_BLOG_SUCCESS';
export const UPDATE_BLOG_FAIL = 'UPDATE_BLOG_FAIL';
    // Para eliminar blog
export const DELETE_BLOG_REQUEST = 'DELETE_BLOG_REQUEST';
export const DELETE_BLOG_SUCCESS = 'DELETE_BLOG_SUCCESS';
export const DELETE_BLOG_FAIL = 'DELETE_BLOG_FAIL';

//Función de GET para los blogs:
export const fetchBlogs = () => async (dispatch) => {
    dispatch({ type: FETCH_HOMEBLOGS_REQUEST });
    try {
        const response = await axios.get(`${url}/api/blog/blogs`);
        const todosLosBlogs = response.data.blogs || [];
        const blogsOrdenados = todosLosBlogs.sort((a, b) =>
        b._id.localeCompare(a._id)
        ).slice(0, 3);

        dispatch({ type: FETCH_HOMEBLOGS_SUCCESS, payload: blogsOrdenados });
    } catch (error) {
        dispatch({
        type: FETCH_HOMEBLOGS_FAIL,
        payload: error.message || 'Error al obtener los blogs',
        });
    }
};

//Función GET para todos los blogs:
export const fetchAllBlogs = () => async (dispatch) => {
    dispatch({ type: FETCH_ALL_BLOGS_REQUEST });
    try {
        const response = await axios.get(`${url}/api/blog/blogs`);
        dispatch({ type: FETCH_ALL_BLOGS_SUCCESS, payload: response.data.blogs });
    } catch (error) {
        dispatch({
        type: FETCH_ALL_BLOGS_FAIL,
        payload: error.response?.data?.message || 'Error al cargar blogs',
        });
    }
};

//Función para traer la noticia individual: 
export const getBlogByPath = (path) => async (dispatch) => {
    dispatch({ type: FETCH_SINGLE_BLOG_REQUEST });
    try {
        const response = await axios.get(`${url}/api/blog/get-blog?path=${path}`);
        dispatch({ type: FETCH_SINGLE_BLOG_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
        type: FETCH_SINGLE_BLOG_FAIL,
        payload: error.response?.data?.message || 'Error al cargar el blog',
        });
    }
};

//Función POST para crear blogs:
export const createBlog = (formData) => async (dispatch) => {
    dispatch({ type: CREATE_BLOG_REQUEST });

    try {
        const response = await axios.post(
            `${url}/api/blog/crear-blog`,
            formData,
            {
                headers: {
                    'x-token': localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        dispatch({
            type: CREATE_BLOG_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_BLOG_FAIL,
            payload: error.response?.data?.message || 'Error al crear la publicación',
        });
    }
};

//Función para actualizar blogs:
export const updateBlog = (id, updatedData) => async (dispatch) => {
    dispatch({ type: UPDATE_BLOG_REQUEST });
    try {
        const response = await axios.put(
        `${url}/api/blog/actualizar-blog?id=${id}`,
        updatedData,
        {
            headers: {
            'x-token': localStorage.getItem('token'),
            },
        }
        );
        dispatch({
        type: UPDATE_BLOG_SUCCESS,
        payload: response.data,
        });
        return response.data;
    } catch (error) {
        dispatch({
        type: UPDATE_BLOG_FAIL,
        payload: error.response?.data?.message || 'Error al actualizar el blog',
        });
    }
};

//Función para eliminar blogs:
export const deleteBlog = (id) => async (dispatch) => {
    dispatch({ type: DELETE_BLOG_REQUEST });
    try {
        await axios.delete(`${url}/api/blog/borrar-blog?id=${id}`, {
        headers: {
            'x-token': localStorage.getItem('token'),
        },
        });

        dispatch({
        type: DELETE_BLOG_SUCCESS,
        payload: id,
        });

    } catch (error) {
        dispatch({
        type: DELETE_BLOG_FAIL,
        payload: error.response?.data?.message || 'Error al eliminar el blog',
        });
    }
};
