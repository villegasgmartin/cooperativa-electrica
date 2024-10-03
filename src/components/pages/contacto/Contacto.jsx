/*Importaciones*/
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { TextField, Button, Select, MenuItem, FormControl } from '@mui/material';
import "../contacto/Contacto.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import BotonFlotante from '../../common/BotonFlotante/BotonFlotante';
import { Fade } from 'react-awesome-reveal';

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
    // Lógica para enviar el formulario , consultar a donde va la información
    console.log(formData);
  };

  return (
    <section className='contacto-main-container'>
      <Fade triggerOnce={true} duration={800} delay={300}>
        <div className='contacto-mensaje-container'>
          <h3 className='contacto-number'>0800-3330357</h3>
          <p className='contacto-mensaje'>
            Solo para EMERGENCIAS de guardia técnica servicio eléctrico (Corresponde a casos de Personas Electrodependientes)
          </p>
        </div>
      </Fade>
      <Fade triggerOnce={true} duration={800} delay={300}>
        <form onSubmit={handleSubmit} className='contacto-form-container'>
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

          <FormControl fullWidth margin="normal">
            <Select
              name="consulta"
              value={formData.consulta}
              onChange={handleChange}
              required
              variant='outlined'
              sx={{ backgroundColor: "#d9f3e3" }}
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

          <Button
            sx={{
              height: "60px",
              fontFamily: "archivo",
              backgroundColor: "#12824c",
              marginTop: "20px"
            }}
            variant='contained'
            size='large'
            type='submit'
          >
            Enviar
          </Button>
        </form>
      </Fade>
      <Fade triggerOnce={true} duration={800} delay={300}>
        <div className='contacto-info-container'>
          <div className='contacto-info'>
            <h4 className='contacto-info-title'>Servicio Eléctrico</h4>
            <div className='contacto-info-align'>
              <p className='contacto-info-text'><strong>Área comercial: </strong>comercial@coopelectmdp.com.ar</p>
              <p className='contacto-info-text'><strong>Horarios de atención: </strong>Lunes a Viernes de 7:30 a 12:30 hs.</p>
              <FacebookIcon
                sx={{
                  color: "#12824c",
                  fontSize: "60px",
                  '&:hover': { transform: 'scale(1.2)' },
                  transition: 'transform 0.3s ease, color 0.3s ease',
                }}
              />
            </div>
          </div>
          <div className='contacto-info'>
            <h4 className='contacto-info-title'>NAVE Internet</h4>
            <div className='contacto-info-align'>
              <p className='contacto-info-text'><strong>Comercial NAVE: </strong>nave@cooperativamdp.com.ar</p>
              <p className='contacto-info-text'><strong>Facturación NAVE: </strong>nave-adm@cooperativamdp.com.ar</p>
              <div className='contacto-icons'>
                <FacebookIcon
                  sx={{
                    color: "#12824c",
                    fontSize: "60px",
                    '&:hover': { transform: 'scale(1.2)' },
                    transition: 'transform 0.3s ease, color 0.3s ease',
                  }}
                />
                <InstagramIcon
                  sx={{
                    color: "#12824c",
                    fontSize: "60px",
                    '&:hover': { transform: 'scale(1.2)' },
                    transition: 'transform 0.3s ease, color 0.3s ease',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Fade>
      <BotonFlotante />
    </section>
  );
};

export default Contacto;
