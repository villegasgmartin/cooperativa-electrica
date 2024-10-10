//Importaciones:
import ResponsiveAppBar from "../../HomeComponents/navbarHome/NavbarHome"
import "../homePortada/HomePortada.css"
import { Button } from "@mui/material"
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import NavBarTest from "../navBarTest/NavBarTest";

//JSX:
const HomePortada = () => {
    return (
        <div className="background-container">
            <section className="homePortada-container">
                <div className="homePortada-contactosContainer">
                    <a className="homePortada-contactos" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/Alberti+3600,+B7600FJT+Mar+del+Plata,+Provincia+de+Buenos+Aires/@-38.0016011,-57.5656229,17z/data=!3m1!4b1!4m6!3m5!1s0x9584deae48ea4f6f:0x9ff38a829e4c01ac!8m2!3d-38.0016011!4d-57.563048!16s%2Fg%2F11hbvxnwh9?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D">
                        <LocationOnTwoToneIcon sx={{color: "white"}}/>
                        <h4 className="homePortada-contactosText">Alberti 3600, Mar del Plata</h4>
                    </a>
                    <a className="homePortada-contactos" target="_blank" rel="noopener noreferrer" href="https://www.google.com.ar/maps/place/20+de+Septiembre+2638,+B7600FJT+Mar+del+Plata,+Provincia+de+Buenos+Aires/@-38.0018912,-57.5653206,17z/data=!3m1!4b1!4m6!3m5!1s0x9584deae4c65e5c9:0x5a1f2b363f441b0!8m2!3d-38.0018955!4d-57.5627457!16s%2Fg%2F11jylv6bym?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D">
                        <LocationOnTwoToneIcon  sx={{color: "white"}}/>
                        <h4 className="homePortada-contactosText">20 de Septiembre 2638, Mar del Plata</h4>
                    </a>
                    <a  href="tel:08003330357" className="homePortada-contactos" id="homePortada-tel">
                        <LocalPhoneTwoToneIcon sx={{color: "white"}}/>
                        <h4 className="homePortada-contactosText">0800-333-0357 / (0223) 495-1411</h4>
                    </a>
                </div>
                {/*<NavBarTest/> */}
                <ResponsiveAppBar/>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}  
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="homePortada-bienvenidaContainer"
                >
                    <h1 className="homePortada-title">Internet a tu alcance</h1>
                    <p className="homePortada-description">Descubre el mejor internet para tu hogar y negocio. Instalaciones, mantenimiento y asesoramiento con los mejores profesionales a tu disposición.</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -100 }} 
                    animate={{ opacity: 1, x: 0 }}  
                    transition={{ duration: 1, delay: 0.4 }}
                    className="homePortada-buttonContainer"
                >
                    <Link to={"/nave"}>
                        <Button sx={{
                            width: "100%", 
                            height: "50px",
                            fontFamily: "archivo",
                            backgroundColor: "#12824c"
                            }} variant="contained">Contratá</Button>
                    </Link>
                </motion.div>
            </section>
        </div>
    )
}

export default HomePortada