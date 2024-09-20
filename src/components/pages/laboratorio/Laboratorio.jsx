//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const Laboratorio = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Laboratorio de medidores'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Laboratorio de medidores</h1>
    </div>
  );
};

export default Laboratorio;