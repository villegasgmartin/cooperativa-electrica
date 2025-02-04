//Importaciones:
import { Fade } from "react-awesome-reveal"
import "../ServicioReclamos/ServicioReclamos.css"

const ServicioReclamos = () => {
    return (
        <Fade triggerOnce={true} duration={800} delay={100}>
            <div className='servicioComponents-container'>
                <div>
                    <h2 className='servicio-title'>Reclamos Comerciales</h2>
                    <p className='servicio-description'>Podes realizar un reclamo por tu facturación, consumos, daños de artefactos u otros conceptos</p>
                </div>
                <div>
                    <h3  className='servicio-subtitles'>¿Cómo hacerlo?</h3>
                    <p className='servicio-description'>Comunicándote a <a href="mailto:comercial@coopelectmdp.com.ar" className='servicio-link'>comercial@coopelectmdp.com.ar</a>, <a href="mailto:comercialgc@cooperativamdp.com.ar" className='servicio-link'>comercialgc@cooperativamdp.com.ar</a> o en nuestra oficina de atención al público.</p>
                </div>
                <div>
                    <h3  className='servicio-subtitles'>Reclamos Técnicos</h3>
                    <p className='servicio-description'>Podés llamar a nuestros teléfonos de atención de reclamos 24hs:</p>
                    <ul>
                        <li style={{listStyle: "none"}}><a href="tel:+2235353648" className="servicio-telefono">223 535-3648</a></li>
                        <li style={{listStyle: "none"}}><a href="tel:+2235354042" className="servicio-telefono">223 535-4042</a></li>
                        <li style={{listStyle: "none"}}><a href="tel:+2235351358" className="servicio-telefono">223 535-1358</a></li>
                    </ul>
                </div>
            </div>
        </Fade>
    )
}

export default ServicioReclamos