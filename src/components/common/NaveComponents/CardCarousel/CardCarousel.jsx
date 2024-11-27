//Importaciones:
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; 
import Card from '../Card/Card';
import "../CardCarousel/CardCarousel.css";

//JSX:
const CardCarousel = ({ servicios}) => {

    const duplicatedServicios = [...servicios, ...servicios];

    return (
        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        navigation={true} 
        pagination={false}
        centeredSlides={true} 
        loop={true} 
        speed={800} 
        autoplay={{
            delay: 3000, 
            disableOnInteraction: false,
        }}
        breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1101: { slidesPerView: 3 },
        }}
        >
            {duplicatedServicios.map((servicio, index) => (
                <SwiperSlide key={index}>
                    <Card 
                        servicio={servicio.servicio} 
                        precio={servicio.precio} 
                        precioLista={servicio.precioLista} 
                        descuento={servicio.descuento} 
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CardCarousel;