
import "../web-captacion/captacion.css";
import { Fade } from 'react-awesome-reveal';
import { TextField, Button, MenuItem } from '@mui/material';
import Footer from '../../common/layout/footer/Footer';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import NavBar from '../../common/layout/navBar/NavBar';
import {Helmet} from "react-helmet"
import React, { useState } from 'react';
import LogoNave from "../../../assets/images/logos/logo-nave-negro.png"




const Captacion = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    plan: '',
    tv: '',
    comentario: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const mensaje = `Buen día, quisiera consultar por la promo edificios. Mis datos son:
Nombre y Apellido: ${formData.nombre}
Dirección: ${formData.direccion}
Teléfono: ${formData.telefono}
Plan de interés: ${formData.plan} MB
¿Quiere sumar TV?: ${formData.tv}
Comentario: ${formData.comentario || 'Sin comentario'}`;

    const urlWhatsapp = `https://wa.me/5492235376973?text=${encodeURIComponent(mensaje)}`;

    window.location.href = urlWhatsapp;
  };

  return (
    <>
      <Helmet>
        <title>Promo Edificios</title>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />
      </Helmet>

      <header className="header-container">
        <div className="header-contactos-container">
          <div className="header-contactos">
            <LocationOnTwoToneIcon sx={{ color: "white" }} />
            <h4 className="header-contactosText">Alberti 3600, Mar del Plata</h4>
          </div>
          <div className="header-contactos">
            <LocationOnTwoToneIcon sx={{ color: "white" }} />
            <h4 className="homePortada-contactosText">20 de Septiembre 2638, Mar del Plata</h4>
          </div>
          <div className="header-contactos" id="homePortada-tel">
            <LocalPhoneTwoToneIcon sx={{ color: "white" }} />
            <h4 className="header-contactosText">0800-333-0357 / (0223) 495-1411</h4>
          </div>
        </div>
      </header>

      <div className="descuento-container">
             <div className='homeSeervicios-logo'>
                     <img src={LogoNave} alt="logo NAVE" width="100%" />
                   </div>
        <div className='mutual-container'>

          <Fade triggerOnce={true} duration={800} delay={300}>
         
            <form className='mutual-form-container' onSubmit={handleSubmit}>
              <p className='mutual-form'>
                ¡Estás muy cerca de tener Internet con descuento!<br />
              </p>
              <p style={{fontSize:'20px'}}>
                Por vivir en este edificio, tenés un 75% OFF en tu abono durante 3 meses. Y después, 50% OFF durante 12 meses más.<br />
                Dejanos tus datos y te contamos cómo activarlo.
              </p>

              <TextField
                label="Nombre y Apellido"
                variant="outlined"
                fullWidth
                margin="normal"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                sx={textFieldStyle}
              />

              <TextField
                label="Dirección exacta"
                variant="outlined"
                fullWidth
                margin="normal"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
                sx={textFieldStyle}
              />

              <TextField
                label="Teléfono"
                variant="outlined"
                fullWidth
                margin="normal"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                sx={textFieldStyle}
              />

              <TextField
                select
                label="Plan que le interesa"
                fullWidth
                margin="normal"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                required
                sx={textFieldStyle}
              >
                <MenuItem value="300">300 MB</MenuItem>
                <MenuItem value="600">600 MB</MenuItem>
                <MenuItem value="1000">1000 MB</MenuItem>
              </TextField>

              <TextField
                select
                label="¿Quiere sumar TV?"
                fullWidth
                margin="normal"
                name="tv"
                value={formData.tv}
                onChange={handleChange}
                required
                 sx={{
                    ...textFieldStyle,
                    width: "100%", 
                    maxWidth:"100%!important"
                }}
              >
                <MenuItem value="Sí">Sí</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>

              <TextField
                label="Comentario (opcional)"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                name="comentario"
                value={formData.comentario}
                onChange={handleChange}
                sx={textFieldStyle}
              />

              <div className='mutual-button'>
                <Button
                  sx={{
                    width: "100%",
                    height: "50px",
                    fontFamily: "interTight",
                    marginTop: "20px",
                    fontSize: "20px",
                    letterSpacing: "1px",
                    borderRadius: "50px",
                    boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                    textTransform: "none",
                    color: "white",
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
      </div>

      <Footer />
    </>

  );
};

const textFieldStyle = {
  backgroundColor: "white",
  '& .MuiOutlinedInput-root': {
    borderRadius: "0px",
    '&.Mui-focused fieldset': {
      borderColor: '#3d116d',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#3d116d',
  },
};

export default Captacion;
