//Importaciones:
import { Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LogoCooperativa from "../../../../assets/images/logo-horizontal.png";
import "../Card/Card.css";
import { Link } from 'react-router-dom';

//JSX:
const Card = ({ servicio, precio }) => {
    return (
        <div className='card'>
        <div className='card-servicioContainer'>
            <h4 className='card-servicio'>{servicio}</h4>
            <h3 className='card-precio'>{precio}</h3>
        </div>
        <div className='card-buttonsContainer'>
            <Button 
            variant='contained'
            LinkComponent={Link}
            to="/formulario"
            sx={{
                backgroundColor: "#8048ff",
                borderRadius: "30px",
                padding: "13px",
                fontFamily: "archivo",
                fontSize: "14px",
                textTransform: 'none'
            }}
            >
            Contratar online
            </Button>
            <a href="https://wa.me/2235376973" target="_blank" rel="noopener noreferrer">
            <Button 
                variant='outlined'
                sx={{
                color: "#8048ff",
                borderColor: "#8048ff",
                borderRadius: "30px",
                padding: "13px",
                fontFamily: "archivo",
                fontSize: "14px",
                borderWidth: "3px",
                textTransform: 'none',
                }}
            >
                <WhatsAppIcon fontSize='small' /> Contratar por Whatsapp
            </Button>
            </a>
        </div>
        <div className='card-logoContainer'>
            <img src={LogoCooperativa} width="85%" alt="Logo de la Cooperativa Eléctrica" />
        </div>
        </div>
    );
    };

    export default Card;