//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const ProvinciaNet = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Provincia NET'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Provincia NET</h1>
    </div>
  );
};

export default ProvinciaNet;