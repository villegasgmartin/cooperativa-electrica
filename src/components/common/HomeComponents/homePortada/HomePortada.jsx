// Importaciones:
import "./HomePortada2.css";
import { Button } from "@mui/material";
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import NavBar from "../../layout/navBar/NavBar";


// JSX:
const HomePortada2 = () => {
return (
        <section className="homePortada-container">
            <div className="homePortada-contactosContainer">
                <a className="homePortada-contactos" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/Alberti+3600,+B7600FJT+Mar+del+Plata,+Provincia+de+Buenos+Aires/@-38.0016011,-57.5656229,17z/data=!3m1!4b1!4m6!3m5!1s0x9584deae48ea4f6f:0x9ff38a829e4c01ac!8m2!3d-38.0016011!4d-57.563048!16s%2Fg%2F11hbvxnwh9?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D">
                    <LocationOnTwoToneIcon sx={{ color: "white" }} />
                    <h4 className="homePortada-contactosText">Alberti 3600, Mar del Plata</h4>
                </a>
                <a className="homePortada-contactos" target="_blank" rel="noopener noreferrer" href="https://www.google.com.ar/maps/place/20+de+Septiembre+2638,+B7600FJT+Mar+del+Plata,+Provincia+de+Buenos+Aires/@-38.0018912,-57.5653206,17z/data=!3m1!4b1!4m6!3m5!1s0x9584deae4c65e5c9:0x5a1f2b363f441b0!8m2!3d-38.0018955!4d-57.5627457!16s%2Fg%2F11jylv6bym?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D">
                    <LocationOnTwoToneIcon sx={{ color: "white" }} />
                    <h4 className="homePortada-contactosText">20 de Septiembre 2638, Mar del Plata</h4>
                </a>
                <a href="tel:08003330357" className="homePortada-contactos" id="homePortada-tel">
                    <LocalPhoneTwoToneIcon sx={{ color: "white" }} />
                    <h4 className="homePortada-contactosText">0800-333-0357</h4>
                </a>
            </div>
            <NavBar/>
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="homePortada-bienvenidaContainer"
            >
                <h1 className="homePortada-title">Internet a <span className="homePortada-resaltado01">tu alcance</span></h1>
                <h2 className="homePortada-title02">Descubre el <span className="homePortada-resaltado02">mejor internet para tu hogar y negocio</span></h2>
                <h3 className="homePortada-description">Instalaciones, mantenimiento y asesoramiento con los mejores profesionales a tu disposición.</h3>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="homePortada-buttonContainer"
            >
                <Button
  component={Link}
  to="/nave"
  sx={{
    width: "100%",
    height: "70px",
    fontFamily: "interTight",
    marginTop: "20px",
    fontSize: "30px",
    fontWeight: "bold",
    letterSpacing: "2px",
    borderRadius: "50px",
    boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
    textTransform: "none",
    color: "white",
    backgroundColor: "#8048ff",
  }}
  variant="contained"
  size="large"
>
  Contratá
</Button>

            </motion.div>
        </section>
    );
};

export default HomePortada2;