//Importaciones:
import { Link } from "react-router-dom"
import FooterLogo from "../../../../assets/images/logo.png"
import "../footer/Footer.css"

//JSX:
const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-logo-container">
                <img className="footer-logo" src={FooterLogo} alt="" />
            </div>
            <div className="footer-links-container">
                <div className="footer-border"></div>
                <Link className="footer-links" to="/">Home</Link>
                <Link className="footer-links" to="/nave">Servicios</Link>
                <Link className="footer-links" to="/blog">Blog</Link>
                <Link className="footer-links" to="">Guardia Eléctrica</Link>
                <Link className="footer-links" to="/contacto">Contacto</Link>
                <div className="footer-border"></div>
            </div>
            <div className="footer-info-container">
                <div>
                    <p className="footer-info">Alberti 3600</p>
                    <p className="footer-info">B7600FJT Mar del Plata</p>
                </div>
                <div>
                    <h4 className="footer-info-title">TELEFONOS:</h4>
                    <p className="footer-info">0800-333-0357 / (0223) 495-1411</p>
                </div>
                <div>
                    <h4 className="footer-info-title">INTERNET NAVE:</h4>
                    <p className="footer-info">(+549) 223 537-6973</p>
                </div>
                <div>
                    <h4 className="footer-info-title">HORARIOS DE ATENCIÓN:</h4>
                    <p className="footer-info">Lunes a Viernes de 7:30 a 12:30 hs.</p>
                </div>
                <div>
                    <h4 className="footer-info-title">GUARDIA SERVICIO ELÉCTRICO:</h4>
                    <p className="footer-info">223 535-3648</p>
                    <p className="footer-info">223 535-4042</p>
                    <p className="footer-info">223 535-1358</p>
                </div>
            </div>
        </div>
    )
}

export default Footer