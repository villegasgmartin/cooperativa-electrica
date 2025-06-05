//Importaciones:
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import "./btnWS.css";
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Asegúrate de importar el ícono

//JSX:
const StyledFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: 20,
    right: 24,
    width: 60,
    height: 60,
    backgroundColor: '#12824c',
    color: 'white',
    '&:hover': {
        backgroundColor: '#2eed8d',
    },
    '@media (max-width: 760px)': {
        right: 16,
    },
}));

// Componente funcional del botón
const BotonWhatsapp = () => {
    const handleClick = () => {
        const phoneNumber = '2235376973';
        const message = encodeURIComponent('Hola! Quería averiguar sobre NAVE INTERNET');
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, '_blank');
    };

    return (
        <StyledFab aria-label="whatsapp" onClick={handleClick} className='btn-ws'>
            <WhatsAppIcon />
        </StyledFab>
    );
};

export default BotonWhatsapp;