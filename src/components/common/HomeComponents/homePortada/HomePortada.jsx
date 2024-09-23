//Importaciones:
import ResponsiveAppBar from "../../HomeComponents/navbarHome/NavbarHome"
import "../homePortada/HomePortada.css"
import { Button } from "@mui/material"
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import { Link } from "react-router-dom";

//JSX:
const HomePortada = () => {
    return (
        <div className="background-container">
            <section className="homePortada-container">
                <div className="homePortada-contactosContainer">
                    <a className="homePortada-contactos" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/Alberti+3600,+B7600FJT+Mar+del+Plata,+Provincia+de+Buenos+Aires/@-38.0016011,-57.5656229,17z/data=!3m1!4b1!4m6!3m5!1s0x9584deae48ea4f6f:0x9ff38a829e4c01ac!8m2!3d-38.0016011!4d-57.563048!16s%2Fg%2F11hbvxnwh9?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D">
                        <LocationOnTwoToneIcon sx={{color: "white"}}/>
                        <h4 className="homePortada-contactosText">Alberti 3600, B7600FJT Mar del Plata</h4>
                    </a>
                    <a  href="tel:08003330357" className="homePortada-contactos">
                        <LocalPhoneTwoToneIcon sx={{color: "white"}}/>
                        <h4 className="homePortada-contactosText">0800-333-0357 / (0223) 495-1411</h4>
                    </a>
                </div>
                <ResponsiveAppBar/>
                <div className="homePortada-bienvenidaContainer">
                    <h1 className="homePortada-title">Electricidad e Internet a tu alcance</h1>
                    <p className="homePortada-description">Descubre soluciones de electricidad e internet diseñadas para tu hogar y negocio. Instalaciones, mantenimiento y asesoramiento con los mejores profesionales a tu disposición.</p>
                    <Link to={"/nave"}>
                        <Button sx={{marginTop: "20px", backgroundColor: "#12824c", fontFamily: "archivo" }} variant="contained">Contratá</Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default HomePortada