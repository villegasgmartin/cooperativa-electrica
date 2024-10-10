// Importaciones:
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { enviarFormularioMutual } from '../../../store/mutualSlice';
import { Button, TextField, Typography } from '@mui/material';
import "../mutual/Mutual.css";
import MutualImage from "../../../assets/images/mutual.jpeg";
import { Fade } from 'react-awesome-reveal';

//JSX: 
const Mutual = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.mutual);
  
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });

  useEffect(() => {
    dispatch(setTitle(''));
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(enviarFormularioMutual(formData));
  };

  return (
    <section className='mutual-main-container'>
      <Fade triggerOnce={true} duration={800} delay={300}>
        <p className='mutual-text'>
          SI SOS ASOCIADO Y NO TENES DEUDA EN LA FACTURACIÓN DE ELECTRICIDAD, 
          COMPLETA EL FORMULARIO Y CONSULTÁ SOBRE TU CARNET CON BENEFICIOS.
        </p>
      </Fade>
      <div className='mutual-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='mutual-image-container'>
            <img src={MutualImage} alt="Mutual" className='mutual-image' />
          </div>
          <form className='mutual-form-container' onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom
              sx={{
                color: "#12824c",
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
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
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
              name="correo"
              value={formData.correo}
              onChange={handleChange}
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
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
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
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
            {error && <p>{error}</p>}
            {success && <p>Consulta enviada con éxito!</p>}
          </form>
        </Fade>
      </div>
      <Fade triggerOnce={true} duration={800} delay={300}>
        <div className='mutual-enlace'>
          <p className='mutual-enlace-text'>LISTADO DE PROFESIONALES Y COMERCIOS ADHERIDOS</p>
          <a href="https://mutualami.org.ar/mutual/beneficios/" target='_blank' rel="noopener noreferrer" className='form-buttonFinal-container'>
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