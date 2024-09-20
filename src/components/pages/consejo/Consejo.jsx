//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const Consejo = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Consejo de administración'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Consejo de administración</h1>
    </div>
  );
};

export default Consejo;