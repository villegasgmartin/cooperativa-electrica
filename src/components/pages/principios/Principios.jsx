//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const Principios = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Principios cooperativos'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Principios cooperativos</h1>
    </div>
  );
};

export default Principios;