// Importaciones:
import { useState } from "react";
import { Button } from "@mui/material";
import "../homeServicios/HomeServicios.css";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import { Link } from "react-router-dom";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// JSX:
// Imágenes de los servicios
import ServiceImage50 from "../../../../assets/images/services/50.jpeg";
import ServiceImage100 from "../../../../assets/images/services/100.jpeg";
import ServiceImage300 from "../../../../assets/images/services/300.jpeg";
import ServiceImage500 from "../../../../assets/images/services/500.jpeg";
import ServiceImageFullTV from "../../../../assets/images/services/fullTv.jpeg";
import ServiceImageFutbol from "../../../../assets/images/services/futbolPremium.jpeg";

// Datos de los servicios
const services = [
  {
    title: "Plan Internet 50 Mb",
    description:
      "Ideal para hogares con uso moderado de internet. Perfecto para navegar, redes sociales y streaming en calidad estándar. Mantén tus dispositivos conectados sin problemas.",
    image: ServiceImage50,
    speed: "50",
    price: "$12.614/mes"
  },
  {
    title: "Plan Internet 100 Mb",
    description:
      "Una opción equilibrada para familias o usuarios que requieren más velocidad. Disfruta de streaming en HD, descargas rápidas y una navegación fluida para múltiples dispositivos.",
    image: ServiceImage100,
    speed: "100",
    price: "$16.846/mes"
  },
  {
    title: "Plan Internet 300 Mb",
    description:
      "Para quienes necesitan alta velocidad y rendimiento. Realiza videollamadas, juegos en línea y disfruta de streaming en calidad 4K sin interrupciones. Ideal para hogares con varios usuarios conectados.",
    image: ServiceImage300,
    speed: "300",
    price: "$19.864/mes"
  },
  {
    title: "Plan Internet 500 Mb",
    description:
      "La mejor opción para usuarios intensivos. Con una velocidad ultrarrápida, descarga archivos pesados, disfruta de múltiples transmisiones en 4K y mantén toda la casa conectada sin ralentizaciones.",
    image: ServiceImage500,
    speed: "500",
    price: "$24.893/mes"
  },
  {
    title: "Plan Full TV",
    description:
      "Accede a una amplia variedad de canales de entretenimiento, noticias, deportes y películas. Perfecto para toda la familia, con contenido para todas las edades y gustos.",
    image: ServiceImageFullTV,
    speed: "Full TV",
    price: "$8.570/mes"
  },
  {
    title: "Plan Fútbol Premium",
    description:
      "Vive el fútbol en su máxima expresión. Disfruta de todos los partidos de tus ligas favoritas, nacionales e internacionales, con calidad HD. No te pierdas ningún gol ni jugada clave.",
    image: ServiceImageFutbol,
    speed: "Fútbol Premium",
    price: "$8.786/mes"
  },
];

const HomeServicios = () => {
  const [selectedService, setSelectedService] = useState(services[0]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="homeServicios-container">
      <h3 className="homeServicios-title">Internet Cooperativas</h3>
      <div className="homeServicios-description">
        <h4 className="homeServicios-text">Instalación sin cargo!</h4>
        <h4 className="homeServicios-text">Modem Dual Band a comodato</h4>
      </div>
      <div className="homeServicios-buttonContainer">
        {services.map((service, index) => (
          <button
            key={index}
            className={`button-services ${selectedService === service ? "active" : ""}`}
            onClick={() => handleServiceClick(service)}
          >
            <div className="button-info-container">
              <WifiTetheringIcon sx={{ color: "grey" }} />
              <h4 className="button-text">{service.speed}</h4>
              {service.speed !== "Full TV" && service.speed !== "Fútbol Premium" && (
                <p className="megas">Mbps</p>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="info-servicio-container">
        <div className="info-servicio-text-button">
          <div className="info-servicio-text">
            <h5 className="info-servicio-title">{selectedService.title}</h5>
            <p className="info-servicio-description">{selectedService.description}</p>
          </div>
          <div className="contratar">
            <h5 className="price">{selectedService.price}</h5>
            <Link to={"/formulario"}>
              <Button variant="contained" 
                size="large"
                sx={{backgroundColor: "#ffff",
                  color: "#12824c",
                  fontFamily: "archivo"
                }} >
                Contratar
              </Button>
            </Link>
          </div>
        </div>
        <div className="info-servicio-img">
          <img src={selectedService.image} width="100%" alt={selectedService.title} style={{borderRadius: "5px"}} />
        </div>
      </div>
      <a className="whatsapp-container" href="https://wa.me/2235376973" target="_blank">
        <WhatsAppIcon
          fontSize="large"
          sx={{color: "#2eed8d"}}
        />
        <h4 className="whatsapp">(223)537-6973</h4>
      </a>
    </div>
  );
};

export default HomeServicios;
