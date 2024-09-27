//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import CardCarousel from '../../common/NaveComponents/CardCarousel/CardCarousel';
import BotonFlotante from '../../common/BotonFlotante/BotonFlotante';

//JSX:
const Nave = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle(''));
  }, [dispatch]);

  return (
    <section>
      <CardCarousel/>
      <BotonFlotante/>
    </section>
  );
};

export default Nave;