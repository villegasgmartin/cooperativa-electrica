//Importaciones:
import "../header/Header.css"
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import ResponsiveAppBar from "../navbarPages/NavbarPages"

//JSX:
const Header = ({title}) => {
    return (
        <div>
            <div className="header-contactos-container">
                <div className="header-contactos">
                    <LocationOnTwoToneIcon sx={{color: "white"}}/>
                    <h4 className="header-contactosText">Alberti 3600, B7600FJT Mar del Plata</h4>
                </div>
                <div className="header-contactos">
                    <LocalPhoneTwoToneIcon sx={{color: "white"}}/>
                    <h4 className="header-contactosText">0800-333-0357 / (0223) 495-1411</h4>
                </div>
            </div>
            <ResponsiveAppBar/>
            <div className="header-title-container">
                <h2 className="header-title">{title}</h2>
            </div>
        </div>
    )
}

export default Header