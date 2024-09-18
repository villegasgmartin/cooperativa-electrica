//Importaciones:
import ResponsiveAppBar from "../../navbarHome/NavbarHome"
import "../homePortada/HomePortada.css"
import { Button } from "@mui/material"
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';

//JSX:
const HomePortada = () => {
    return (
        <div className="background-container">
            <div className="homePortada-container">
                <div className="homePortada-contactosContainer">
                    <div className="homePortada-contactos">
                        <LocationOnTwoToneIcon sx={{color: "white"}}/>
                        <h4 className="homePortada-contactosText">Alberti 3600, B7600FJT Mar del Plata</h4>
                    </div>
                    <div className="homePortada-contactos">
                        <LocalPhoneTwoToneIcon sx={{color: "white"}}/>
                        <h4 className="homePortada-contactosText">0800-333-0357 / (0223) 495-1411</h4>
                    </div>
                </div>
                <ResponsiveAppBar/>
                <div className="homePortada-bienvenidaContainer">
                    <h3 className="homePortada-title">Lorem ipsum, dolor sit amet consectetur</h3>
                    <p className="homePortada-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quod, recusandae magni perferendis nulla porro odio</p>
                    <Button sx={{marginTop: "20px", backgroundColor: "#12824c", fontFamily: "archivo" }} variant="contained">Disponibilidad</Button>
                </div>
            </div>
        </div>
    )
}

export default HomePortada