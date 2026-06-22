import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box, Divider, Fade } from '@mui/material';
import { Launch, LibraryBooks, LocalHospital, Language, ShoppingCart } from '@mui/icons-material';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import "../beneficios/style.css"
import { Helmet } from 'react-helmet';
import NavBar from '../../common/layout/navBar/NavBar';
import Footer from '../../common/layout/footer/Footer';

const BeneficiosAsociado = () => {
  const servicios = [
    {
      titulo: "Descuentos exclusivos con AMI",
      desc: "Accedé a importantes descuentos en comercios de distintos rubros y profesionales de la salud.",
      link: "https://mutualami.org.ar/beneficios/index.php",
      target: "_blank",
      icon: <ShoppingCart />
    },
    {
      titulo: "Internet al mejor precio",
      desc: "Disfrutá de tarifas preferenciales en nuestros planes de Internet a través de NAVE.",
      link: "https://www.cooperativamdp.com/nave",
      target: "",
      icon: <Language />
    },
    {
      titulo: "Biblioteca Rateriy",
      desc: "Actualización impositiva y retiro de libros sin costo. Más comodidad y ahorro de tiempo.",
      link: "https://www.cooperativamdp.com/biblioteca",
      target: "",
      icon: <LibraryBooks />
    },
    {
      titulo: "Emergencias Médicas VITTAL",
      desc: "Cobertura exclusiva para dos personas en servicio de ambulancias.",
      link: "https://www.cooperativamdp.com/vittal",
      target: "",
      icon: <LocalHospital />
    }
  ];

  return (
    <>
        <Helmet>
        <title>Beneficios | Cooperativa eléctrica Mar del Plata</title>
      </Helmet>
        <header className="header-beneficios-container">
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
    
      </header>
    <Container sx={{ py: 8 }}>
      {/* Sección Intro */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography  component="h1"  className='beneficios-text' sx={{
                m: 0,
                p: 0,
                fontSize: 'unset',
                fontWeight: 'unset',
                lineHeight: 'unset',
                fontFamily: 'inherit',
                color: 'inherit'
            }}>
          Ser asociado tiene ventajas
        </Typography>
        <Typography variant="p" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          A través de tu carnet, ahorrá en tus compras, accedé a servicios de salud, 
          obtené beneficios exclusivos y disfrutá de prestaciones pensadas para acompañarte.
        </Typography>
      </Box>

      {/* Grid de Beneficios */}
      <Grid container spacing={4}>
        {servicios.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2, boxShadow: 3 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color:"#8048FF" }}>
                  {item.icon}
                  <Typography component="h2" sx={{ ml: 1, fontWeight: 600, color:"#8048FF" }}>{item.titulo}</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {item.desc}
                </Typography>
                <Button 
                  variant="contained" 
                  
                  href={item.link}
                  target={item.target}
                  sx={{ borderRadius: 2, backgroundColor:"#8048FF" }}
                >
                  Ver información
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="body1" fontStyle="italic">
          Seguimos incorporando nuevas prestaciones y beneficios para brindar más servicios y mejores oportunidades a todos nuestros asociados.
        </Typography>
      </Box>
    </Container>
      <Footer />
    </>
  );
};

export default BeneficiosAsociado;