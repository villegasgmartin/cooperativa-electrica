//Importaciones: 
import CardCarousel from '../../NaveComponents/CardCarousel/CardCarousel'
import "../homeServices3/HomeServices3.css"
import LogoNave from "../../../../assets/images/Logo_Nave_Negro.png"
import { Link } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'
import React, { useState, useEffect } from 'react';

//JSX:
const HomeServices3 = () => {

  const [showArrowsAndDots, setShowArrowsAndDots] = useState(false);

  const serviciosHome = [
    { servicio: "Internet 100 MB", precio: "$16.846" },
    { servicio: "Internet 300 MB", precio: "$19.864" },
    { servicio: "Internet 500 MB", precio: "$24.893" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1111) {
        setShowArrowsAndDots(true); 
      } else {
        setShowArrowsAndDots(false); 
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        <CardCarousel servicios={serviciosHome} showArrowsAndDots={showArrowsAndDots} />
      </Fade>
      <Fade triggerOnce={true} duration={800} delay={700}>
        <Link to={"/nave"} style={{ textDecorationColor: "#8048ff" }}>
          <p className='homeServicios-link'>Conocer más</p>
        </Link>
      </Fade>
    </section>
  );
}

export default HomeServices3;
