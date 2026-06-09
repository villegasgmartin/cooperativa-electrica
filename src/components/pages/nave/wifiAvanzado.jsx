import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Fade,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function InfoSection() {
  const [active, setActive] = useState(0);

  const sections = [
    {
      title: "Beneficios",
      image:
        "https://res.cloudinary.com/dj3akdhb9/image/upload/t_casa/Imagen-Casas_yqzall.png",
        items: [
        "Conexión de alta velocidad| WiFi 6",
        "Cobertura completa | Red Mesh en cada rincón",
        "Redes separadas | Configuración para mayor seguridad",
        "No más zonas sin señal",
        "Internet ilimitado y sin cortes",
        "Compatibilidad para multiples dispositivos"
      ],
    },
    {
      title: "Beneficios",
      image:
        "https://res.cloudinary.com/dj3akdhb9/image/upload/v1780996705/Imagen-Empresas_pguj7k.png",
      items: [
        "Conexión de alta velocidad| WiFi 6",
        "Cobertura completa | Red Mesh en cada rincón",
        "Redes separadas | Configuración para mayor seguridad",
        "No más zonas sin señal",
        "Internet ilimitado y sin cortes",
        "Compatibilidad para multiples dispositivos"
      ],
    },
  ];

  return (
    <Box py={10}>
      <Container maxWidth="lg">
        {/* Encabezado */}
        <Typography
          variant="h3"
          fontWeight={700}
          textAlign="center"
          gutterBottom
        >
WiFi Avanzado: Conectividad Total e Inteligente        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          maxWidth={1000}
          mx="auto"
          mb={5}
        >
          Lleva la experiencia de navegación al siguiente nivel con nuestro servicio de WiFi Avanzado. Diseñado para hogares y negocios que exigen el máximo rendimiento, este sistema garantiza una conectividad sin interrupciones, eliminando los puntos muertos y permitiendo que todos tus dispositivos funcionen a su máxima capacidad simultáneamente.
        </Typography>

        {/* Botones */}
   <Stack direction="row" spacing={2} justifyContent="center" mb={6}>

  {/* CASA */}
  <Button
    variant={active === 0 ? "contained" : "outlined"}
    onClick={() => setActive(0)}
    size="large"
    sx={{
      width: "250px",
      height: "50px",
      fontFamily: "interTight",
      fontSize: "20px",
      letterSpacing: "1px",
      borderRadius: "50px",
      boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
      textTransform: "none",

      color: active === 0 ? "white" : "#8048ff",
      backgroundColor: active === 0 ? "#8048ff" : "transparent",
      border: active === 0 ? "none" : "2px solid #8048ff",

      "&:hover": {
        backgroundColor:
          active === 0 ? "#6f3fe0" : "rgba(128, 72, 255, 0.08)",
      },
    }}
  >
    Casa
  </Button>

  {/* NEGOCIO */}
  <Button
    variant={active === 1 ? "contained" : "outlined"}
    onClick={() => setActive(1)}
    size="large"
    sx={{
      width: "250px",
      height: "50px",
      fontFamily: "interTight",
      fontSize: "20px",
      letterSpacing: "1px",
      borderRadius: "50px",
      boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
      textTransform: "none",

      color: active === 1 ? "white" : "#8048ff",
      backgroundColor: active === 1 ? "#8048ff" : "transparent",
      border: active === 1 ? "none" : "2px solid #8048ff",

      "&:hover": {
        backgroundColor:
          active === 1 ? "#6f3fe0" : "rgba(128, 72, 255, 0.08)",
      },
    }}
  >
    Negocio
  </Button>

</Stack>

        {/* Contenido */}
        <Fade in={true} timeout={500} key={active}>
          <Box>
            <Grid
              container
              spacing={6}
              alignItems="center"
            >
              {/* Texto */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  fontWeight={600}
                  gutterBottom
                >
                  {sections[active].title}
                </Typography>

               <Box component="ul" sx={{ pl: 0, listStyle: "none" }}>
  {sections[active].items.map((item, index) => (
    <Box
      key={index}
      component="li"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        mb: 1.5,
      }}
    >
      <CheckCircleIcon
        sx={{ color: "#8048ff", mt: "3px", fontSize: 20 }}
      />

      <Typography variant="body1">
        {item}
      </Typography>
    </Box>
  ))}
</Box>
              </Grid>

              {/* Imagen */}
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={sections[active].image}
                  alt={sections[active].title}
                  sx={{
                    width: "100%",
                    borderRadius: 4,
                    objectFit: "cover",
                    boxShadow: 4,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}