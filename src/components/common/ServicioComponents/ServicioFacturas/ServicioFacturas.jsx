//Importaciones:
import { Fade } from "react-awesome-reveal"
import "../ServicioFacturas/ServicioFacturas.css"

//JSX:
const ServicioFacturas = () => {
    return (
        <Fade triggerOnce={true} duration={800} delay={100}>
            <div className='servicioComponents-container'>
                <h2 className='servicio-title'>Facturas</h2>
                <div>
                    <h3 className='servicio-subtitles'>¿Dónde recibir y descargar mis facturas?</h3>
                    <p className='servicio-description'>Solicitando en nuestras oficinas te la enviamos por correo electrónico y/o por Whatsapp.</p>
                </div>
                <p className='servicio-description'>También la podes descargar de nuestra oficina virtual y gestionar a que correo o número de Whatsapp la queres recibir.</p>
            </div>
        </Fade>
    )
}

export default ServicioFacturas