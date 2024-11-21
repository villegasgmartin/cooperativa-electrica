import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { enviarFormularioMutual } from '../../../store/mutualSlice';
import { Button, TextField, Typography } from '@mui/material';
import "../mutual/Mutual.css";
import { Fade } from 'react-awesome-reveal';
import Swal from 'sweetalert2';

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

    Swal.fire({
      title: 'Enviando...',
      text: 'Tu consulta está siendo enviada.',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    dispatch(enviarFormularioMutual(formData));
  };

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Tu mensaje ha sido enviada con éxito',
        confirmButtonColor: '#12824c',
        customClass: {
          title: 'swal2-title',
          content: 'swal2-content',
          confirmButton: 'swal2-confirm',
          popup: 'swal2-popup-custom'
        }
      });
    }

    setFormData({
      nombre: '',
      correo: '',
      mensaje: ''
    });

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar la consulta. Por favor, intenta nuevamente.',
        confirmButtonColor: '#12824c',
      });
    }
  }, [success, error]);

  return (
    <section className='mutual-main-container'>
      <Fade triggerOnce={true} duration={900} delay={300}>
        <p className='mutual-text'>
        Si <strong>sos asociado y no tenes deuda en la facturación</strong> de electricidad, 
        completa el formulario y <strong>consultá sobre tu carnet con beneficios</strong>.
        </p>
      </Fade>
      <div className='mutual-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='mutual-image-container'>
            <p className='mutual-text01'>MUTUAL</p>
            <p className='mutual-text02'>para tu<span className='mutual-text03'>familia</span></p>
          </div>
          <form className='mutual-form-container' onSubmit={handleSubmit}>
            <p className='mutual-form'>Completa el formulario</p>
            <TextField
              label="Nombre y Apellido"
              variant="outlined"
              fullWidth
              margin="normal"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              sx={{
                backgroundColor: "white",
                '& .MuiOutlinedInput-root': {
                  borderRadius: "15px",
                  '&.Mui-focused fieldset': {
                    borderColor: '#3d116d',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#3d116d',
                },
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
              required
              sx={{
                backgroundColor: "white",
                '& .MuiOutlinedInput-root': {
                  borderRadius: "15px",
                  '&.Mui-focused fieldset': {
                    borderColor: '#3d116d',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#3d116d',
                },
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
              required
              sx={{
                backgroundColor: "white",
                '& .MuiOutlinedInput-root': {
                  borderRadius: "15px",
                  '&.Mui-focused fieldset': {
                    borderColor: '#3d116d',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#3d116d',
                },
              }}
            />
            <div className='mutual-button'>
              <Button sx={{ 
                  width: "100%",
                  height: "50px",
                  fontFamily: "interTight",
                  marginTop: "20px",
                  fontSize: "20px",
                  letterSpacing: "1px",
                  borderRadius: "50px",
                  boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                  textTransform: "none",
                  color:"white",
                  backgroundColor: "#8048ff",
                }} 
                variant='contained' 
                size='large'
                type='submit'
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
          </form>
        </Fade>
      </div>
      <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
        <div className='mutual-enlace'>
          <p className='mutual-enlace-text'>LISTADO DE <strong>PROFESIONALES Y COMERCIOS</strong> ADHERIDOS</p>
          <div className='mutual-button-container'>
            <a href="https://mutualami.org.ar/mutual/beneficios/" target='_blank' rel="noopener noreferrer" className='form-buttonFinal-container'>
            <Button sx={{ 
                  width: "100%",
                  height: "70px",
                  fontFamily: "interTight",
                  marginTop: "20px",
                  fontSize: "30px",
                  letterSpacing: "1px",
                  borderRadius: "50px",
                  boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                  textTransform: "none",
                  color:"white",
                  backgroundColor: "#8048ff",
                }} 
                variant='contained' 
                size='large'
              >
                Ver aquí
              </Button>
            </a>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default Mutual;