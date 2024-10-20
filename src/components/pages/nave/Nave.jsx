//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import CardCarousel from '../../common/NaveComponents/CardCarousel/CardCarousel';
import { Fade } from 'react-awesome-reveal';
import "../nave/Nave.css"

//JSX:
const Nave = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle(''));
  }, [dispatch]);

  const serviciosNave = [
    { servicio: "Internet 50 MB", precio: "$12.614" },
    { servicio: "Internet 100 MB", precio: "$16.846" },
    { servicio: "Internet 300 MB", precio: "$19.864" },
    { servicio: "Internet 500 MB", precio: "$24.893" },
    { servicio: "Full TV", precio: "$8.570" },
    { servicio: "Fútbol Premium", precio: "$8.786" },
];


  return (
    <section className='nave-main-container'>
      <Fade triggerOnce={true} duration={800} delay={300}>
        <h1 className='nave-title'>Internet Cooperativa</h1>
        <p className='nave-text'>Descubre nuestras increíbles opciones de Internet y televisión diseñadas para satisfacer todas tus necesidades de entretenimiento y conectividad.</p>
      </Fade>
      <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
        <CardCarousel servicios={serviciosNave}  showArrowsAndDots={true}/>
      </Fade>
    </section>
  );
};

export default Nave;