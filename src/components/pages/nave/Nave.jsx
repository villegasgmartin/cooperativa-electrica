//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import CardCarousel from '../../common/NaveComponents/CardCarousel/CardCarousel';
import { Fade } from 'react-awesome-reveal';
import "../nave/Nave.css"
import Footer from '../../common/layout/footer/Footer';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import NavBar from '../../common/layout/navBar/NavBar';
import LogoNave from "../../../assets/images/logos/logo-nave-blanco.png"

//JSX:
const Nave = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle(''));
  }, [dispatch]);

  const serviciosNave = [
    { servicio: "INTERNET 50 MB", precio: "$12.614" },
    { servicio: "INTERNET 100 MB", precio: "$16.846" },
    { servicio: "INTERNET 300 MB", precio: "$19.864" },
    { servicio: "INTERNET 500 MB", precio: "$24.893" },
    { servicio: "FULL TV", precio: "$8.570" },
    { servicio: "FÚTBOL PREMIUM", precio: "$8.786" },
];


  return (
    <>
      <header className="header-nave-container">
          <div className="header-contactos-container">
              <div className="header-contactos">
                  <LocationOnTwoToneIcon sx={{ color: "white" }} />
                  <h4 className="header-contactosText">Alberti 3600, Mar del Plata</h4>
              </div>
              <div className="header-contactos">
                  <LocationOnTwoToneIcon sx={{ color: "white" }} />
                  <h4 className="homePortada-contactosText">20 de Septiembre 2638, Mar del Plata</h4>
              </div>
              <div className="header-contactos" id="homePortada-tel">
                  <LocalPhoneTwoToneIcon sx={{ color: "white" }} />
                  <h4 className="header-contactosText">0800-333-0357 / (0223) 495-1411</h4>
              </div>
          </div>
          <div className="navbarPages-container">
              <NavBar backgroundColorMovile="#201c1c" backgroundColor="#201c1c" />
          </div>
          <Fade  triggerOnce={true} duration={800} delay={300}>
              <div className='header-nave'>
                <div className='header-nave-logoContainer'><img src={LogoNave} alt="NAVE Internet" className='header-nave-logo' /></div>
                <div className='header-nave-textContainer'>
                  <h1 className='header-nave-title'>Internet <span className='header-nave-resaltado'>Cooperativa</span></h1>
                  <p className='header-nave-text'>Descubre nuestras increíbles <span  className='header-nave-resaltado'>opciones de Internet y televisión</span> diseñadas para satisfacer todas tus necesidades de entretenimiento y conectividad.</p>
                </div>
              </div>
          </Fade>
      </header>
      <section className='nave-main-container'>
      <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
        <CardCarousel servicios={serviciosNave}  showArrowsAndDots={true}/>
      </Fade>
    </section>
    <Footer/>
    </>
  );
};

export default Nave;