//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import CardCarousel from '../../common/NaveComponents/CardCarousel/CardCarousel';

//JSX:
const Nave = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle(''));
  }, [dispatch]);

  return (
    <div>
      <CardCarousel/>
    </div>
  );
};

export default Nave;