//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const Nave = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Internet Cooperativa'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Nave</h1>
    </div>
  );
};

export default Nave;