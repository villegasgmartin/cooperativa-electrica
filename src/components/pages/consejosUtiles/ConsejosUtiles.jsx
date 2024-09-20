//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const ConsejosUtiles = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Consejos Útiles'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Consejos utiles</h1>
    </div>
  );
};

export default ConsejosUtiles;