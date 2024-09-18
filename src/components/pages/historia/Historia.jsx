//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const Historia = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Historia'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Historia</h1>
    </div>
  );
};

export default Historia;