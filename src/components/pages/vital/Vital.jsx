//Importaciones:
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enviarFormularioMutual } from '../../../store/mutualSlice';
import { Button, TextField, Typography, Modal, Box } from '@mui/material';
import "../vital/Vital.css";
import { Fade } from 'react-awesome-reveal';
import Swal from 'sweetalert2';
import Footer from '../../common/layout/footer/Footer';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import NavBar from '../../common/layout/navBar/NavBar';
import LogoVittal from "../../../assets/images/logos/vittal-logo.png"
import {Helmet} from "react-helmet"
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';
import { enviarFormularioVittal } from '../../../store/vittalSlice';
import CloseIcon from '@mui/icons-material/Close';

//JSX:
const Vital = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.mutual);
  
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });

const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   Swal.fire({
  //     title: 'Enviando...',
  //     text: 'Tu consulta está siendo enviada.',
  //     showConfirmButton: false,
  //     didOpen: () => {
  //       Swal.showLoading();
  //     }
  //   });

  //   dispatch(enviarFormularioMutual(formData));
  // };

//   const handleSubmit = (event) => {
    
//     event.preventDefault();
    
//     let message = `Hola, mi nombre es ${formData.nombre}\n Mi correo es: ${formData.correo}\n  y quisiera consultar por ${formData.mensaje}`;
//     const phoneNumber = "2235941363";
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

//     window.open(whatsappUrl, '_blank');
// };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.nombre && formData.correo && formData.mensaje) {
      // const destino =
      //   formData.consulta === "Consulta sobre NAVE"
      //     ? "nave@cooperativamdp.com.ar"
      //     : "comercial@coopelectmdp.com.ar";

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
          consulta: 'Consulta sobre Vittal',
          mensaje: ''
        });

        dispatch(enviarFormularioVittal({ ...formData}));
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
    <>
    <Helmet>
      <title>Vittal | Cooperativa electrica Mar del Plata</title>
    </Helmet>
    <header className="header-mutual-container">
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
          <div className="navbarPages-container">
              <NavBar/>
          </div>
          <Fade  triggerOnce={true} duration={800} delay={300}>
            <div className='vittal-logo-container'><img src={LogoVittal} alt="Vittal" width={"100%"} /></div>
          </Fade>
      </header>
      <section className='mutual-main-container'>
        <Fade triggerOnce={true} duration={900} delay={300}>
          {/* <p className='mutual-text'>
          Hace tu consulta sobre los beneficios de AMI
          </p> */}
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
            <form className='mutual-form-container' onSubmit={handleSubmit}>
              <p className='mutual-form'>Realiza tu consulta</p>
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
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='vittal-button-container-mobile'>
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

                // Media query para pantallas de 370px o menos
                "@media (max-width: 370px)": {
                  fontSize: "16px",
                },
              }}
              variant="contained"
              size="large"
              onClick={handleOpenModal}
            >
              Conocé todo lo que incluye
            </Button>
        </div>
        </Fade>
         {/* MODAL */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-titulo"
          aria-describedby="modal-descripcion"
        >
          <Box sx={{
            backgroundColor: 'white',
            borderRadius: "20px",
            padding: "30px",
            maxWidth: "600px",
            width: "90%",
            margin: "100px auto",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
            fontFamily: "interTight",
            position: "relative"
          }}>
            <CloseIcon
              onClick={handleCloseModal}
              sx={{ position: "absolute", top: 20, right: 20, cursor: "pointer", color: "#8048ff" }}
            />
            <Typography id="modal-titulo" variant="h5" sx={{ color: "#3d116d", marginBottom: "20px", fontWeight: "bold" }}>
              Servicios incluidos con Vittal + AMI
            </Typography>
            <ul style={{ paddingLeft: "20px", marginBottom: "20px", color: "#333" }}>
              <li><strong>Emergencias médicas:</strong> Sin cargo</li>
              <li><strong>Urgencias médicas:</strong> Sin cargo</li>
              <li><strong>Consultas médicas online:</strong> Sin cargo</li>
              <li><strong>Visitas a domicilio:</strong> Con cargo (materiales descartables y medicación incluidos sin costo)</li>
              <li><strong>Hogar protegido:</strong> Cobertura para terceros en el hogar</li>
              <li><strong>Vehículo protegido:</strong> Cobertura para terceros en el vehículo</li>
              <li><strong>Asistencia fuera de la ciudad</strong></li>
              <li><strong>Beneficios y descuentos exclusivos de AMI</strong></li>
            </ul>
            <Typography id="modal-descripcion" sx={{ color: "#333" }}>
              <strong>¿Cómo accedo al servicio?</strong><br />
              Completá el formulario de inscripción en esta página. Una vez registrado, recibirás un mail de confirmación.<br /><br />
              <strong>Importante:</strong> los servicios se activan a partir del día 10 del mes siguiente a tu inscripción.
            </Typography>
          </Box>
        </Modal>
        {/* <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
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
        </Fade> */}
        <BotonWhatsapp/>
      </section>
      <Footer/>
    </>
  );
};

export default Vital;