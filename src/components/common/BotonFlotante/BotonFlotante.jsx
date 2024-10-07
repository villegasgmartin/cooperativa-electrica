//Importaciones:
import Fab from '@mui/material/Fab';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { styled } from '@mui/material/styles';

//JSX:
const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 24,
  right: 90,
  backgroundColor: '#12824c',
  color: 'white',
  '&:hover': {
    backgroundColor: '#2eed8d',
  },
  '@media (max-width: 760px)': {
    right: 16,
  },
}));

const BotonFlotante = () => {
  const handleClick = () => {
    window.open('https://wa.me/2235376973', '_blank');
  };

  return (
    <StyledFab aria-label="whatsapp" onClick={handleClick}>
      <WhatsAppIcon />
    </StyledFab>
  );
};

export default BotonFlotante;
