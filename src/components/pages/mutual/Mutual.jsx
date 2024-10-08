// Importaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Button, TextField, Typography } from '@mui/material';
import "../mutual/Mutual.css";
import MutualImage from "../../../assets/images/mutual.jpeg";
import { Fade } from 'react-awesome-reveal';

// JSX:
const Mutual = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle(''));
  }, [dispatch]);

  return (
    <section className='mutual-main-container'>
      <Fade triggerOnce={true} duration={800} delay={300}>
        <p className='mutual-text'>
          SI SOS ASOCIADO Y NO TENES DEUDA EN LA FACTURACIÓN DE ELECTRICIDAD, 
          COMPLETA EL FORMULARIO Y CONSULTÁ SOBRE TU CARNET CON BENEFICIOS.
        </p>
      </Fade>
        <div className='mutual-container' >
          <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='mutual-image-container'>
            <img src={MutualImage} alt="Mutual" className='mutual-image' />
          </div>
          <form action="" className='mutual-form-container'>
            <Typography variant="h6" gutterBottom
            sx={{color: "#12824c",
                fontFamily: "archivo",
                textAlign: "center",
                fontSize: {
                  xs: '22px',
                  sm: '25px',
                }
            }}
            >
              Completa el formulario
            </Typography>
            <TextField
              label="Nombre y Apellido"
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{
                backgroundColor: "#d9f3e3",
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                    borderColor: '#12824c',
                    },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#12824c',
                }
              }}
            />
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              sx={{
                backgroundColor: "#d9f3e3",
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                    borderColor: '#12824c',
                    },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#12824c',
                }
              }}
            />
            <TextField
              label="Mensaje"
              variant="outlined"
              multiline
              rows={7}
              fullWidth
              margin="normal"
              sx={{
                backgroundColor: "#d9f3e3",
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                    borderColor: '#12824c',
                    },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#12824c',
                }
              }}
            />
            <div className='form-buttonContainer'>
              <Button sx={{ 
                  width: "100%",
                  height: "60px",
                  fontFamily: "archivo",
                  backgroundColor: "#12824c",
                  marginTop: "10px"
                }} 
                  variant='contained' 
                  size='large'
                  type='submit'
              >
                Enviar
              </Button>
            </div>
          </form>
        </Fade>
      </div>
      <Fade triggerOnce={true} duration={800} delay={300}>
        <div className='mutual-enlace'>
          <p className='mutual-enlace-text'>LISTADO DE PROFESIONALES Y COMERCIOS ADHERIDOS</p>
          <a href="https://mutualami.org.ar/mutual/beneficios/" target='_blank' className='form-buttonFinal-container'>
              <Button sx={{ 
                    width: "100%",
                    height: "60px",
                    fontFamily: "archivo",
                    backgroundColor: "#12824c",
                    marginTop: "10px"
                  }} 
                    variant='contained' 
                    size='large'
                >
                  ver aquí
                </Button>
          </a>
        </div>
      </Fade>
    </section>
  );
};

export default Mutual;
