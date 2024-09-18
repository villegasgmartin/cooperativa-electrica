//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const Comunicados = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Comunicados Institucionales'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Comunicados Institucionales</h1>
    </div>
  );
};

export default Comunicados;