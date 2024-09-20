//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const Contacto = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Contacto'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Contacto</h1>
    </div>
  );
};

export default Contacto;