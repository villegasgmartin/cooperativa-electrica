//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const Biblioteca = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Biblioteca'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Biblioteca</h1>
    </div>
  );
};

export default Biblioteca;