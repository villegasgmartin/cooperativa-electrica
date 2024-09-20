//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const ServicioElectrico = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Servicio Eléctrico'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Servicio Eléctrico</h1>
    </div>
  );
};

export default ServicioElectrico;