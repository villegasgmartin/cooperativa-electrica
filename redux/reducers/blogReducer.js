//Acciones importadas::
import {
    FETCH_HOMEBLOGS_REQUEST, FETCH_HOMEBLOGS_SUCCESS, FETCH_HOMEBLOGS_FAIL,
    FETCH_ALL_BLOGS_REQUEST, FETCH_ALL_BLOGS_SUCCESS, FETCH_ALL_BLOGS_FAIL,
    FETCH_SINGLE_BLOG_REQUEST, FETCH_SINGLE_BLOG_SUCCESS, FETCH_SINGLE_BLOG_FAIL,
    CREATE_BLOG_REQUEST, CREATE_BLOG_SUCCESS, CREATE_BLOG_FAIL,
    UPDATE_BLOG_REQUEST, UPDATE_BLOG_SUCCESS, UPDATE_BLOG_FAIL,
    DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, DELETE_BLOG_FAIL
} from '../actions/blogActions';



//Estado inicial:
    const initialState = {
    blogs: [],
    allBlogs: [],
    singleBlog: null,
    loading: false,
    error: null,
    createBlogLoading: false,
    createBlogError: null,
    createBlogSuccess: false,
    updateBlogLoading: false,
    updateBlogError: null,
    updateBlogSuccess: false,
    deleteBlogLoading: false,
    deleteBlogError: null,
    deleteBlogSuccess: false,
    };

//Reducers:
const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_HOMEBLOGS_REQUEST:
        case FETCH_ALL_BLOGS_REQUEST:
        case FETCH_SINGLE_BLOG_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_HOMEBLOGS_SUCCESS:
            return { ...state, loading: false, blogs: action.payload };

        case FETCH_ALL_BLOGS_SUCCESS:
            return { ...state, loading: false, allBlogs: action.payload };

        case FETCH_SINGLE_BLOG_SUCCESS:
            return { ...state, loading: false, singleBlog: action.payload };

        case FETCH_HOMEBLOGS_FAIL:
        case FETCH_ALL_BLOGS_FAIL:
        case FETCH_SINGLE_BLOG_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CREATE_BLOG_REQUEST:
            return {
            ...state,
            createBlogLoading: true,
            createBlogError: null,
            createBlogSuccess: false,
            };

        case CREATE_BLOG_SUCCESS:
            return {
            ...state,
            createBlogLoading: false,
            createBlogSuccess: true,
            };

        case CREATE_BLOG_FAIL:
            return {
            ...state,
            createBlogLoading: false,
            createBlogError: action.payload,
            createBlogSuccess: false,
            };

        case UPDATE_BLOG_REQUEST:
                    return {
                        ...state,
                        updateBlogLoading: true,
                        updateBlogError: null,
                        updateBlogSuccess: false,
                    };

        case UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                updateBlogLoading: false,
                updateBlogSuccess: true,
                blogs: state.blogs.map(blog =>
                    blog._id === action.payload._id ? action.payload : blog
                ),
                allBlogs: state.allBlogs.map(blog =>
                    blog._id === action.payload._id ? action.payload : blog
                ),
            };

        case UPDATE_BLOG_FAIL:
            return {
                ...state,
                updateBlogLoading: false,
                updateBlogError: action.payload,
                updateBlogSuccess: false,
            };

        case DELETE_BLOG_REQUEST:
            return {
                ...state,
                deleteBlogLoading: true,
                deleteBlogError: null,
                deleteBlogSuccess: false,
            };

        case DELETE_BLOG_SUCCESS:
            return {
                ...state,
                deleteBlogLoading: false,
                deleteBlogSuccess: true,
                blogs: state.blogs.filter(blog => blog._id !== action.payload),
                allBlogs: state.allBlogs.filter(blog => blog._id !== action.payload),
            };

        case DELETE_BLOG_FAIL:
            return {
                ...state,
                deleteBlogLoading: false,
                deleteBlogError: action.payload,
                deleteBlogSuccess: false,
            };

        default:
            return state;
}
};

export default blogReducer;
