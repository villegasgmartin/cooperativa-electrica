//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const Valores = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Valores'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Valores</h1>
    </div>
  );
};

export default Valores;