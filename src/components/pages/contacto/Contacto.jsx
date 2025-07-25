// Importaciones:
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { enviarFormulario } from '../../../store/contactoSlice';
import { TextField, Button, Select, MenuItem, FormControl } from '@mui/material';
import Swal from 'sweetalert2';
import "../contacto/Contacto.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Fade } from 'react-awesome-reveal';
import {Helmet} from "react-helmet"

// JSX:
const Contacto = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Contacto'));
  }, [dispatch]);

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    consulta: 'Consulta sobre NAVE',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.nombre && formData.correo && formData.consulta && formData.mensaje) {
      const destino =
        formData.consulta === "Consulta sobre NAVE"
          ? "nave@cooperativamdp.com.ar"
          : "comercial@coopelectmdp.com.ar";

      Swal.fire({
        title: 'Enviando...',
        text: 'Tu consulta está siendo enviada.',
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading(); 
        }
      });

      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Mensaje enviado!',
          text: 'Tu consulta ha sido enviada correctamente.',
          confirmButtonColor: '#12824c',
          customClass: {
            title: 'swal2-title',
            content: 'swal2-content',
            confirmButton: 'swal2-confirm',
            popup: 'swal2-popup-custom'
          }
        });

        setFormData({
          nombre: '',
          correo: '',
          consulta: 'Consulta sobre NAVE',
          mensaje: ''
        });

        dispatch(enviarFormulario({ ...formData, destino }));
      }, 1000);

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos.',
        confirmButtonColor: '#12824c',
        customClass: {
          title: 'swal2-title',
          content: 'swal2-content',
          confirmButton: 'swal2-confirm',
          popup: 'swal2-popup-custom'
        }
      });
    }
  };

  return (
    <section className='contacto-main-container'>
      <Helmet>
        <title>Contacto</title>
      </Helmet>
        <div className='contacto-container'> 
          <div className='contacto-mensaje-container'> 
            <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
              <div className='contacto-mensaje-electrica'>
                <h3 className='contacto-number'>Guardia técnica Servicio Eléctrico</h3>
                <p className='contacto-mensaje'>Solo para EMERGENCIAS (Corresponde a casos de Personas Electrodependientes)</p>
                <h3 className='contacto-number'><a href="https://wa.link/583s3n" target="_blank" rel="noopener noreferrer"> 223 540-5430</a></h3>
                
              </div>
            </Fade>
            <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                <div className='contacto-mensaje-nave'>
                  <h3 className='contacto-number'>Guardia técnica NAVE Internet</h3>
                  <p className='contacto-mensaje'>De Lunes a Viernes de 7 a 23hs (Solo llamados)</p>
                  <h3 className='contacto-number'>153060280</h3>
                </div>
            </Fade>
        </div>
          <Fade triggerOnce={true} duration={800} delay={300}>
            <form onSubmit={handleSubmit} className='contacto-form-container'>
            <h2 className='contacto-form-title'>¿En qué podemos ayudarte?</h2>
            <TextField
              label="Nombre"
              name="nombre"
              variant="outlined"
              required
              fullWidth
              margin="normal"
              value={formData.nombre}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: "15px",
                  '&.Mui-focused fieldset': {
                    borderColor: '#3d116d',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#3d116d',
                }
              }}
            />
            <TextField
              label="Correo electrónico"
              name="correo"
              type="email"
              variant="outlined"
              required
              fullWidth
              margin="normal"
              value={formData.correo}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: "15px",
                  '&.Mui-focused fieldset': {
                    borderColor: '#3d116d',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#3d116d',
                }
              }}
            />

            <FormControl fullWidth margin="normal">
              <Select
                name="consulta"
                value={formData.consulta}
                onChange={handleChange}
                required
                variant='outlined'
                sx={{ borderRadius: "15px"}}
              >
                <MenuItem value="Consulta sobre NAVE">Consulta sobre NAVE</MenuItem>
                <MenuItem value="Consulta sobre Electricidad">Consulta sobre Electricidad</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Mensaje"
              name="mensaje"
              multiline
              rows={8}
              variant="outlined"
              required
              fullWidth
              margin="normal"
              value={formData.mensaje}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: "15px",
                  '&.Mui-focused fieldset': {
                    borderColor: '#3d116d',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#3d116d',
                }
              }}
            />
            <div className='contactos-button-container'>
              <Button
                sx={{
                  width: "100%",
                  height: "100%",
                  fontFamily: "interTight",
                  fontSize: "25px",
                  textTransform: "none",
                  borderRadius: "25px",
                  backgroundColor: "#8048ff",
                  marginTop: "20px"
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
      <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
      <div className='contacto-info-container'>
          <div className='contacto-info'>
            <h4 className='contacto-info-title'>Servicio Eléctrico</h4>
            <div className='contacto-info-align'>
              <p className='contacto-info-text'><strong>Área comercial: </strong>comercial@coopelectmdp.com.ar</p>
              <p className='contacto-info-text'><strong>Horarios de atención: </strong>Lunes a Viernes de 7:30 a 12:30 hs.</p>
              <p className='contacto-info-text'><strong>Consejo de Administración: </strong>consejo@coopelectmdp.com.ar</p>
              <div className='contacto-icons'>
                <a href="https://www.facebook.com/people/Cooperativa-El%C3%A9ctrica-MDP-Nave-Internet/61565189905138/" target='_blank' rel='noopener noreferrer'>
                  <FacebookIcon
                    sx={{
                      color: "#12824c",
                      fontSize: {
                        xs: '90px',
                        sm: '90px', 
                        md: '90px', 
                        lg: '90px',
                        xl: '90px', 
                      },
                      '&:hover': { transform: 'scale(1.2)' },
                      transition: 'transform 0.3s ease, color 0.3s ease',
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className='contacto-info'>
            <h4 className='contacto-info-title contacto-color'>NAVE Internet</h4>
            <div className='contacto-info-align'>
              <p className='contacto-info-text'><strong>Área comercial: </strong>nave@cooperativamdp.com.ar</p>
              <p className='contacto-info-text'><strong>Horarios de atención: </strong>Lunes a Viernes de 8 a 15 hs.</p>
              <p className='contacto-info-text'><strong>Facturación NAVE: </strong>nave-adm@cooperativamdp.com.ar</p>
              <div className='contacto-icons'>
                <a href="https://www.facebook.com/people/Cooperativa-Eléctrica-MDP-Nave-Internet/61565189905138/?mibextid=wwXIfr&rdid=Ci1CpuLrZfMzq4Qk&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BdQEzvr5v%2F%3Fmibextid%3DwwXIfr" target='_blank' rel='noopener noreferrer'>
                  <FacebookIcon
                    sx={{
                      color: "#3d116d",
                      fontSize: {
                        xs: '90px',
                        sm: '90px', 
                        md: '90px', 
                        lg: '90px', 
                        xl: '90px',
                      },
                      '&:hover': { transform: 'scale(1.2)' },
                      transition: 'transform 0.3s ease, color 0.3s ease',
                    }}
                  />
                </a>
                <a href="https://www.instagram.com/coopelectmdp_nave/" target='_blank' rel='noopener noreferrer'>
                  <InstagramIcon
                    sx={{
                      color: "#3d116d",
                      fontSize: {
                        xs: '90px',
                        sm: '90px',
                        md: '90px', 
                        lg: '90px', 
                        xl: '90px', 
                      },
                      '&:hover': { transform: 'scale(1.2)' },
                      transition: 'transform 0.3s ease, color 0.3s ease',
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
  };

export default Contacto;
