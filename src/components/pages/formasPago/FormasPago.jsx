//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import Acordeon from "../../common/FormasPagoComponents/acordeon/Acordeon"

//JSX:
const FormasPago = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Formas y lugares de pago'));
  }, [dispatch]);

  return (
    <div style={{height: "600px"}}>
        <Acordeon/>
    </div>
  );
};

export default FormasPago;