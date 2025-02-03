// Importaciones:
import { Link } from 'react-router-dom';
import "../ServicioConexion/ServicioConexion.css"

// JSX:
const ServicioConexion = () => {
    return (
        <div>
            <h2>Conexión al servicio</h2>
            <p>Conecta el servicio en tu hogar o comercio</p>
            <h3>¿Cómo realizar tu trámite?</h3>
            <p>Comunicándote a <a href="mailto:comercial@coopelectmdp.com.ar">comercial@coopelectmdp.com.ar</a>, <a href="mailto:comercialgc@cooperativamdp.com.ar" >comercialgc@cooperativamdp.com.ar</a> o en nuestra oficina de atención al público</p>
            <h3>¿Qué más tenés que saber?</h3>
            <p>Para realizar tu trámite, tenés que tener en cuenta el destino de tu servicio eléctrico, acreditar tu identidad con DNI, presentar documentación de posesión  y proporcionar detalles de tu vivienda, comercio u otros fines.</p>
            <Link to="/preguntas-frecuentes#pregunta-18">Más información</Link>
        </div>
    )
}

export default ServicioConexion