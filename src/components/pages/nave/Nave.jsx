//Importaciones:
import { useState, useEffect } from 'react';
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
import {Helmet} from "react-helmet"
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';
import logoMax from "../../../assets/images/logos/logo-max.jpg"
import { Button} from '@mui/material';
import { Link } from 'react-router-dom';

//JSX:
const Nave = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle(''));
  }, [dispatch]);

  const serviciosNave = [
    { servicio: "INTERNET 100 MB", precio: "$11.113",/* precioLista: "$18.1333",*/ descuento: "$7.020 OFF por 12 meses", categoria: "internet" },
    { servicio: "INTERNET 300 MB", precio: "$12.222", /*precioLista: "$21.381",*/ descuento: "$9.159 OFF por 12 meses", categoria: "internet" },
    { servicio: "INTERNET 500 MB", precio: "$15.405", /*precioLista: "$26.795",*/ descuento: "$11.390 OFF por 12 meses", categoria: "internet" },
    { servicio: "PACK TV", precio: "9.999", /*precioLista: "",*/ descuento: "100% Entretenimiento", categoria: "tv", descripcion: (
      <>
        Tv Full + Futbol + 
        <img 
          src={logoMax} 
          alt="Logo Max" 
          style={{ 
            width: '45px', 
            verticalAlign: 'middle', 
            marginLeft: '5px',
            marginRight: "5px" 
          }} 
        />
      GRATIS
      </>
    )
  },
    { servicio: "PACK TV Nave", precio: "$5.999", /*precioLista: "",*/ descuento: "Experiencia Premium", categoria: "tv", descripcion:`Descuento por tener Internet Nave`},
  ];

  const [serviciosFiltrados, setServiciosFiltrados] = useState(serviciosNave);

  const filtrarServicios = (categoria) => {
    if (categoria === "todos") {
      setServiciosFiltrados(serviciosNave);
    } else {
      const serviciosFiltrados = serviciosNave.filter(servicio => servicio.categoria === categoria);
      setServiciosFiltrados(serviciosFiltrados);
    }
  };

  return (
    <>
      <Helmet>
        <title>NAVE Internet</title>
      </Helmet>
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
        <Fade triggerOnce={true} duration={800} delay={300}>
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
      <Fade triggerOnce={true} duration={800} delay={300}>
        <div className="nave-buttons-container">
            <button className='nave-button-01' onClick={() => filtrarServicios("todos")}>Todos</button>
            <button className='nave-button-02' onClick={() => filtrarServicios("internet")}>Internet</button>
            <button className='nave-button-03' onClick={() => filtrarServicios("tv")}>TV</button>
        </div>
      </Fade>
        <Fade triggerOnce={true} duration={800} delay={300} >
          <CardCarousel servicios={serviciosFiltrados}/>
        </Fade>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='nave-subcontainer'>
            <h2 className='nave-h2'>Conectividad confiable y accesible para Mar del Plata</h2>
            <p className='nave-description'>Ofrecemos planes de internet por fibra óptica diseñados para hogares y comercios, con atención personalizada y soporte técnico local.</p>
          </div>
          <div className='nave-button-container'>
            <Link to="/preguntas-nave" style={{ width: '100%', textDecoration: 'none' }}>
              <Button sx={{ 
                width: "100%",
                height: "50px",
                fontFamily: "interTight",
                marginTop: "20px",
                fontSize: "20px",
                letterSpacing: "1px",
                borderRadius: "50px",
                boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                textTransform: "none",
                color: "white",
                backgroundColor: "#8048ff",
              }} 
              variant='contained' 
              size='large'
              >
                Ver Preguntas Frecuentes
              </Button>
            </Link>
          </div>
        </Fade>
        <BotonWhatsapp/>
      </section>
      <Footer />
    </>
  );
};

export default Nave;