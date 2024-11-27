//Importaciones: 
import CardCarousel from '../../NaveComponents/CardCarousel/CardCarousel'
import "../homeServices3/HomeServices3.css"
import LogoNave from "../../../../assets/images/logos/logo-nave-negro.png"
import { Link } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'

//JSX:
const HomeServices3 = () => {

  const serviciosHome = [
    { servicio: "INTERNET 100 MB", precio: "$11.113", precioLista: "$18.1333", descuento: "$7.020 OFF por 12 meses", categoria: "internet" },
    { servicio: "INTERNET 300 MB", precio: "$12.222", precioLista: "$21.381", descuento: "$9.159 OFF por 12 meses", categoria: "internet" },
    { servicio: "INTERNET 500 MB", precio: "$15.405", precioLista: "$26.795", descuento: "$11.390 OFF por 12 meses", categoria: "internet" },
  ];

  return (
    <section className='homeServicios-container'>
      <Fade triggerOnce={true} duration={800} delay={300}>
        <div className='homeSeervicios-logo'>
          <img src={LogoNave} alt="logo NAVE" width="100%" />
        </div>
        <h2 className='homeServicios-title'>Internet Cooperativa</h2>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <p className='homeServicios-text'>Descubre nuestras increíbles opciones de Internet y televisión diseñadas para satisfacer todas tus necesidades de entretenimiento y conectividad.</p>
        </Fade>
      </Fade>
      <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
        <CardCarousel servicios={serviciosHome} />
      </Fade>
      <Fade triggerOnce={true} duration={800} delay={700}>
        <Link to={"/nave"}>
          <div className='homeServicios-link-container'>
            <a href="" className='homeServicios-link'>Conoce más</a>
          </div>
        </Link>
      </Fade>
    </section>
  );
}

export default HomeServices3;
