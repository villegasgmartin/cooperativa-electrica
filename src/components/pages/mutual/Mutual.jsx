//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const Mutual = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('AMI Mutual'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>AMI Mutual</h1>
    </div>
  );
};

export default Mutual;