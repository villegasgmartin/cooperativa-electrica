//Importaciones:
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enviarFormularioMutual } from '../../../store/mutualSlice';
import { Button, TextField, Typography, Modal, Box,MenuItem } from '@mui/material';
import "../vital/Vital.css";
import { Fade } from 'react-awesome-reveal';
import Swal from 'sweetalert2';
import Footer from '../../common/layout/footer/Footer';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import NavBar from '../../common/layout/navBar/NavBar';
import LogoVittal from "../../../assets/images/logos/vittal-logo.png"
import {Helmet} from "react-helmet"
import { enviarFormularioVittal } from '../../../store/vittalSlice';
import CloseIcon from '@mui/icons-material/Close';
import FechaNacimiento from './fechaNacimiento';

const Vital = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.mutual);

  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    fechaNacimiento: "",
    telefono: "",
    direccion: "",
    numeroAsociado: "",
    correo: "",
    mensaje: "",
  });

  const [adherentes, setAdherentes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAdherente = () => {
    setAdherentes([
      ...adherentes,
      {
        nombre: "",
        dni: "",
        fechaNacimiento: "",
        parentesco: "",
        direccion: "",
        telefono: "",
      },
    ]);
  };

  const handleRemoveAdherente = (index) => {
  const updated = [...adherentes];
  updated.splice(index, 1);
  setAdherentes(updated);
};


  const handleAdherenteChange = (index, e) => {
    const updated = [...adherentes];
    updated[index][e.target.name] = e.target.value;
    setAdherentes(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.nombre &&
      formData.dni &&
      formData.fechaNacimiento &&
      formData.telefono &&
      formData.direccion
    ) {
      Swal.fire({
        title: "Enviando...",
        text: "Tu consulta está siendo enviada.",
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      dispatch(enviarFormularioVittal({ ...formData, adherentes }));

      setFormData({
        nombre: "",
        dni: "",
        fechaNacimiento: "",
        telefono: "",
        direccion: "",
        numeroAsociado: "",
        correo: "",
        mensaje: "",
      });
      setAdherentes([]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, completá todos los campos obligatorios.",
        confirmButtonColor: "#12824c",
      });
    }
  };

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: "success",
        title: "¡Mensaje enviado!",
        text: "Tu mensaje ha sido enviado con éxito.",
        confirmButtonColor: "#12824c",
      });
    }

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al enviar la consulta. Por favor, intentá nuevamente.",
        confirmButtonColor: "#12824c",
      });
    }
  }, [success, error]);

  return (
    <>
      <Helmet>
        <title>Vittal | Cooperativa eléctrica Mar del Plata</title>
      </Helmet>

      <header className="header-mutual-container">
        <div className="header-contactos-container">
          <div className="header-contactos">
            <LocationOnTwoToneIcon sx={{ color: "white" }} />
            <h4 className="header-contactosText">
              Alberti 3600, Mar del Plata
            </h4>
          </div>
          <div className="header-contactos">
            <LocationOnTwoToneIcon sx={{ color: "white" }} />
            <h4 className="homePortada-contactosText">
              20 de Septiembre 2638, Mar del Plata
            </h4>
          </div>
          <div className="header-contactos" id="homePortada-tel">
            <LocalPhoneTwoToneIcon sx={{ color: "white" }} />
            <h4 className="header-contactosText">
              0800-333-0357 / (0223) 495-1411
            </h4>
          </div>
        </div>
        <div className="navbarPages-container">
          <NavBar />
        </div>
        <Fade triggerOnce duration={800} delay={300}>
          <div className="vittal-logo-container">
            <img src={LogoVittal} alt="Vittal" width={"100%"} />
          </div>
        </Fade>
      </header>
      <section>
     <Fade triggerOnce={true} duration={900} delay={300}>
<p className='mutual-text'>
Hace tu consulta sobre los beneficios de AMI
</p>
</Fade>
<div className='mutual-container'>
<Fade triggerOnce={true} duration={800} delay={300}>
<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
<div className='vittal-image-container'>
<p className='mutual-text01'>Vittal + AMI</p>
<ul>
<li className="vittal-text02">Servicio de Emergencia</li>
<li className="vittal-text02">Servicio de Urgencia</li>
<li className="vittal-text02">Servicio de visita a domicilio</li>
<li className="vittal-text02">Servicio de consultas médicas online</li>
<li className="vittal-text02">Servicio de hogar protegido</li>
<li className="vittal-text02">Servicio de vehiculo protegido</li>
<li className="vittal-text02">Servicio de asistencia al viajero</li>
<li className="vittal-text02">Beneficios y descuentos exclusivos de AMI</li>
</ul>
</div>
<div className='vittal-button-container'>
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
                  onClick={handleOpenModal}
                >
                  Conocé todo lo que incluye
                </Button>
              </div>
            </div>
          </Fade>
        </div>
      </section>
  
      

      <section className="mutual-main-container">
<p className="mutual-form">Realizá tu inscripción o consulta</p>
        <form className="mutual-form-container" onSubmit={handleSubmit}>
          

          <TextField className='first-input' label="Apellido y Nombres *" name="nombre" value={formData.nombre} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="DNI *" name="dni" value={formData.dni} onChange={handleChange} fullWidth margin="normal" required />
          {/* <TextField label="Fecha de Nacimiento *" name="fechaNacimiento" type="date" InputLabelProps={{ shrink: true }} value={formData.fechaNacimiento} onChange={handleChange} fullWidth margin="normal" required /> */}
          
            <FechaNacimiento formData={formData} setFormData={setFormData} />
         
          <TextField label="Teléfono *" name="telefono" value={formData.telefono} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Dirección *" name="direccion" value={formData.direccion} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Número de Asociado *" name="numeroAsociado" value={formData.numeroAsociado} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Correo Electrónico" type="email" name="correo" value={formData.correo} onChange={handleChange} fullWidth margin="normal" required/>
          <TextField label="Mensaje *" name="mensaje" value={formData.mensaje} onChange={handleChange} fullWidth margin="normal" multiline rows={4} required />
        
          <div className='Adherentes'>
              <Button variant="outlined" onClick={handleAddAdherente} sx={{ marginTop: 2 }}>
            + Agregar Adherente
          </Button>
          {adherentes.map((adherente, index) => (
            <Box
              key={index}
              sx={{
                padding: 2,
                marginTop: 2,
                border: "1px solid #ccc",
                borderRadius: "10px",
                position: "relative",
              }}
            >
              <CloseIcon
                onClick={() => handleRemoveAdherente(index)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  cursor: "pointer",
                  color: "#8048ff",
                }}
              />
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Adherente #{index + 1}
              </Typography>
              <TextField className='adherente-input' label="Apellido y Nombre" name="nombre" value={adherente.nombre} onChange={(e) => handleAdherenteChange(index, e)} fullWidth margin="normal" />
              <TextField className='adherente-input'  label="DNI" name="dni" value={adherente.dni} onChange={(e) => handleAdherenteChange(index, e)} fullWidth margin="normal" />
              {/* <TextField  className='adherente-input'  label="Fecha de Nacimiento" type="date" name="fechaNacimiento" value={adherente.fechaNacimiento} onChange={(e) => handleAdherenteChange(index, e)} InputLabelProps={{ shrink: true }} fullWidth margin="normal"  /> */}

              <FechaNacimiento
                    formData={adherente}
                    setFormData={(newData) => {
                      const updated = [...adherentes];
                      updated[index] = newData;
                      setAdherentes(updated);
                    }}
                  />
              <TextField className='adherente-input'  label="Parentesco con el Titular" name="parentesco" value={adherente.parentesco} onChange={(e) => handleAdherenteChange(index, e)} select fullWidth margin="normal" >
                {["Hijo/a", "Padre/Madre", "Hermano/a", "Sobrino/a", "Abuelo/a", "Tío/a", "Nieto/a", "Yerno/Nuera", "Otro", "Ajeno", "Grupo Familiar", "Individual"].map((op) => (
                  <MenuItem key={op} value={op}>{op}</MenuItem>
                ))}
              </TextField>
              <TextField  className='adherente-input' label="Dirección" name="direccion" value={adherente.direccion} onChange={(e) => handleAdherenteChange(index, e)} fullWidth margin="normal" />
              <TextField className='adherente-input'  label="Teléfono" name="telefono" value={adherente.telefono} onChange={(e) => handleAdherenteChange(index, e)} fullWidth margin="normal" />
            </Box>
          ))}
          </div>
         
          <div className='submit'>
<Button
            sx={{ 
                    width: "100%",
                    maxWidth:"300px",
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
                  size='large'
          type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
          </div>
          
        </form>

        {/* Modal de información */}
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box sx={{ backgroundColor: "white", borderRadius: "20px", padding: "30px", maxWidth: "600px", width: "90%", margin: "100px auto", boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)", fontFamily: "interTight", position: "relative" }}>
            <CloseIcon onClick={handleCloseModal} sx={{ position: "absolute", top: 20, right: 20, cursor: "pointer", color: "#8048ff" }} />
            <Typography variant="h5" sx={{ color: "#3d116d", marginBottom: "20px", fontWeight: "bold" }}>
              Servicios incluidos con Vittal + AMI
            </Typography>
            <ul style={{ paddingLeft: "20px", marginBottom: "20px", color: "#333" }}>
              <li><strong>Emergencias médicas:</strong> Sin cargo</li>
              <li><strong>Urgencias médicas:</strong> Sin cargo</li>
              <li><strong>Consultas médicas online:</strong> Sin cargo</li>
              <li><strong>Visitas a domicilio:</strong> Con cargo</li>
              <li><strong>Hogar protegido:</strong> Cobertura para terceros en el hogar</li>
              <li><strong>Vehículo protegido:</strong> Cobertura para terceros en el vehículo</li>
              <li><strong>Asistencia fuera de la ciudad</strong></li>
              <li><strong>Beneficios y descuentos exclusivos de AMI</strong></li>
            </ul>
            <Typography sx={{ color: "#333" }}>
              <strong>¿Cómo accedo al servicio?</strong><br />
              Completá el formulario de inscripción en esta página. Una vez registrado, recibirás un mail de confirmación.<br /><br />
              <strong>Importante:</strong> los servicios se activan a partir del día 10 del mes siguiente a tu inscripción.
            </Typography>
          </Box>
        </Modal>
      </section>
      <Footer />
    </>
  );
};

export default Vital;