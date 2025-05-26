// Importaciones:
import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';

// Lista de videos:
const videos = [
    { title: "¿Cómo registrarte en la Oficina Virtual?", url: "https://res.cloudinary.com/dj3akdhb9/video/upload/v1747350234/cooperativa/Videos_tutoriales_Oficina_Virtual_1_wi8jwd.mp4" },
    { title: "¿Cómo dar de alta un servicio en la Oficina Virtual?", url: "https://res.cloudinary.com/dj3akdhb9/video/upload/v1747350240/cooperativa/Video_Tutorial_-_Como_adherir_servicio_2_zsljeg.mp4" },
    { title: "¿Cómo descargo el carnet AMI?", url: "https://res.cloudinary.com/dj3akdhb9/video/upload/v1747350246/cooperativa/Video_Tutorial_-_Carnet_AMI_swdcve.mp4" },
    { title: "¿Cómo adherirme a la Factura Virtual?", url: "https://res.cloudinary.com/dj3akdhb9/video/upload/v1747350253/cooperativa/Video_Tutorial_-_Adhesio%CC%81n_a_Factura_datos_1_dehf8z.mp4" },
];

const PreguntasNaveVideos = () => {
    const isBelow700px = useMediaQuery('(max-width:700px)');

    return (
        <div className="video-gallery">
            <Grid container spacing={3}>
                {videos.map((video, index) => (
                    <Grid item xs={12} sm={isBelow700px ? 12 : 6} key={index}>
                        <div className="video-card">
                            <video
                                width="100%"
                                height="100%"
                                controls
                                style={{ borderRadius: '8px', objectFit: 'cover' }}
                            >
                                <source src={video.url} type="video/mp4" />
                                Tu navegador no soporta el video.
                            </video>
                            <p className="preguntasNave-videoTitle">{video.title}</p>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default PreguntasNaveVideos;