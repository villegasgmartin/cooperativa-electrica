//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const Form = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Internet Cooperativa'));
    }, [dispatch]);

    return (
        <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
        <h1>Formulario</h1>
        </div>
    );
    };

    export default Form;