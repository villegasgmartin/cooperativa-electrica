//Importaciones:
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../success/Success.css';
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';
import Footer from '../../common/layout/footer/Footer';

//JSX:
const Success = () => {
    return (
        <>
            <section className="gracias-container">
                <div className="gracias-box">
                    <h1 className="gracias-title">¡Gracias por tu solicitud!</h1>
                    <p className="gracias-text">
                    Tu reserva fue enviada correctamente. Hemos recibido tus datos y los estamos procesando.
                    </p>
                    <p className="gracias-text">
                    Revisá tu correo electrónico para más información. Si no lo encontrás, no olvides revisar la carpeta de spam o correo no deseado.
                    </p>
                    <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    className="gracias-button"
                    >
                    Volver al inicio
                    </Button>
                </div>
            </section>
            <BotonWhatsapp />
            <Footer/>
        </>
    );
};

export default Success;
