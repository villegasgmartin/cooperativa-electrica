// Importaciones:
import { Link, useLocation } from "react-router-dom";
import FooterLogo from "../../../../assets/images/logos/logo.png";
import "../footer/Footer.css";

//JSX:
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const location = useLocation();

    // Verifica si la ruta actual es "/nave" o "/formulario"
    const excludePages = ["/nave", "/formulario", "/preguntas-nave"];
    const shouldHideSpecificInfo = excludePages.includes(location.pathname);

    return (
        <footer className="footer-container">
            <div className="footer-logo-container">
                <img className="footer-logo" src={FooterLogo} alt="Logo" />
            </div>
            <div className="footer-copy-links">
                <div className="footer-links-container">
                    <div className="footer-border"></div>
                    <Link className="footer-links" to="/">Home</Link>
                    <Link className="footer-links" to="/nave">Servicios</Link>
                    <Link className="footer-links" to="/blog">Blog</Link>
                    <Link className="footer-links" to="/servicio-electrico">Servicio Eléctrico</Link>
                    <Link className="footer-links" to="/contacto">Contacto</Link>
                    <div className="footer-border"></div>
                </div>
                <p className="copyright">Copyright (c)<span>{currentYear}</span> Desarrollado por <a className="copyright-link" href="https://duwohdevelopers.com/" target="_blank">Duwoh Developers</a></p>
            </div>

            {/* Bloques de información específicos */}
            <div className="footer-info-container">
                <div>
                    <h4 className="footer-info-title">TELEFONOS:</h4>
                    <a href="tel:08003330357" style={{textDecoration: "none"}}><p className="footer-info">0800-333-0357</p></a>
                </div>
                <div>
                    <h4 className="footer-info-title">INTERNET NAVE:</h4>
                    <a href="tel:5492235376973" style={{textDecoration: "none"}}><p className="footer-info">(+549) 223 537-6973</p></a>
                </div>
                <div>
                    <h4 className="footer-info-title">HORARIOS DE ATENCIÓN NAVE INTERNET:</h4>
                    <p className="footer-info">Lunes a Viernes de 8 a 15 hs.</p>
                </div>
                {/* Ocultar estos divs solo en /nave y /formulario */}
                {!shouldHideSpecificInfo && (
                    <>
                        <div>
                            <h4 className="footer-info-title">HORARIOS DE ATENCIÓN SERVICIO ELÉCTRICO:</h4>
                            <p className="footer-info">Lunes a Viernes de 7:30 a 12:30 hs.</p>
                        </div>
                        <div>
                            <h4 className="footer-info-title">GUARDIA SERVICIO ELÉCTRICO:</h4>
                            <a href="tel:2235353648" style={{ textDecoration: "none" }}>
                                <p className="footer-info">223 535-3648</p>
                            </a>
                            <a href="tel:2235354042" style={{ textDecoration: "none" }}>
                                <p className="footer-info">223 535-4042</p>
                            </a>
                            <a href="tel:2235351358" style={{ textDecoration: "none" }}>
                                <p className="footer-info">223 535-1358</p>
                            </a>
                        </div>
                        <div>
                            <h4 className="footer-info-title">BIBLIOTECA:</h4>
                            <p className="footer-info">Lunes a Viernes de 7:30 a 13:30 hs.</p>
                            <a href="tel:2234935777" style={{ textDecoration: "none" }}>
                                <p className="footer-info">223 493-5777 (interno 5)</p>
                            </a>
                            <a href="https://bibliotecarateriy.com.ar/" target="_blank" style={{ textDecoration: "none" }}>
                                <p className="footer-info">bibliotecarateriy.com.ar</p>
                            </a>
                        </div>
                    </>
                )}
                {/* Resto de la información que siempre se muestra */}
            </div>
            <p className="copyright copy-movile">Copyright (c)<span>{currentYear}</span> Desarrollado por <a className="copyright-link" href="https://duwohdevelopers.com/" target="_blank">Duwoh Developers</a></p>
        </footer>
    );
};

export default Footer;