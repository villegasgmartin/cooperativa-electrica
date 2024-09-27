//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Button } from '@mui/material';
import "../mutual/Mutual.css"
import MutualImage from "../../../assets/images/mutual.jpeg"

//JSX:
const Mutual = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle(''));
  }, [dispatch]);

  return (
    <section className='mutual-main-container'>
      <h2 className='mutual-title'>AMI Mutual</h2>
      <div className='mutual-container'>
        <div className='mutual-text-container'>
          <p className='mutual-first-text'>CON TU PLAN 100/100MB DE NAVE INTERNET ACCEDÉS AL PLAN A2 PARA TODO TU GRUPO FAMILIAR</p>
          <p className='mutual-second-text'>CONSULTÁ LOS BENEFICIOS DE LA CARTILLA ACTUALIZADA EN EL LINK</p>
          <Button>Ver Cartilla</Button>
        </div>
        <div className='mutual-image-container'><img src={MutualImage} alt="imágen de AMI Mutual" className='mutual-image' /></div>
      </div>
    </section>
  );
};

export default Mutual;