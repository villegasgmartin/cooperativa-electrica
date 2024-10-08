//Importaciones:
import { Link } from "react-router-dom"
import FooterLogo from "../../../../assets/images/logo.png"
import "../footer/Footer.css"

//JSX:
const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-logo-container">
                <img className="footer-logo" src={FooterLogo} alt="" />
            </div>
            <div className="footer-links-container">
                <div className="footer-border"></div>
                <Link className="footer-links" to="/">Home</Link>
                <Link className="footer-links" to="/nave">Servicios</Link>
                <Link className="footer-links" to="/blog">Blog</Link>
                <Link className="footer-links" to="/servicio-electrico">Servicio Eléctrico</Link>
                <Link className="footer-links" to="/contacto">Contacto</Link>
                <div className="footer-border"></div>
            </div>
            <div className="footer-info-container">
                <div>
                    <h4 className="footer-info-title">TELEFONOS:</h4>
                    <a href="tel:08003330357" style={{textDecoration: "none"}}><p className="footer-info">0800-333-0357 / (0223) 495-1411</p></a>
                </div>
                <div>
                    <h4 className="footer-info-title">INTERNET NAVE:</h4>
                    <a href="tel:5492235376973" style={{textDecoration: "none"}}><p className="footer-info">(+549) 223 537-6973</p></a>
                </div>
                <div>
                    <h4 className="footer-info-title">HORARIOS DE ATENCIÓN NAVE INTERNET:</h4>
                    <p className="footer-info">Lunes a Viernes de 8 a 15 hs.</p>
                </div>
                <div>
                    <h4 className="footer-info-title">HORARIOS DE ATENCIÓN SERVICIO ELÉCTRICO:</h4>
                    <p className="footer-info">Lunes a Viernes de 7:30 a 12:30 hs.</p>
                </div>
                <div>
                    <h4 className="footer-info-title">GUARDIA SERVICIO ELÉCTRICO:</h4>
                    <a href="tel:2235353648" style={{textDecoration: "none"}}><p className="footer-info">223 535-3648</p></a>
                    <a href="tel:2235354042" style={{textDecoration: "none"}}><p className="footer-info">223 535-4042</p></a>
                    <a href="tel:2235351358" style={{textDecoration: "none"}}><p className="footer-info">223 535-1358</p></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer