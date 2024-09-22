//Importaciones:
import Slider from "react-slick";
import Card from '../Card/Card';
import './CardCarousel.css';

const CardCarousel = () => {
    const servicios = [
        { servicio: "50 megas", precio: "$12.614 x mes" },
        { servicio: "100 megas", precio: "$16.846 x mes" },
        { servicio: "300 megas", precio: "$19.864 x mes" },
        { servicio: "500 megas", precio: "$24.893 x mes" },
        { servicio: "Full TV", precio: "$8.570 x mes" },
        { servicio: "Fútbol Premium", precio: "$8.786 x mes" },
    ];

    // Configuración del carrusel
    const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
    {
        breakpoint: 1110,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
        },
    },
    {
        breakpoint: 770,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        },
    },
    ],
};

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {servicios.map((item, index) => (
                    <div key={index}>
                <Card servicio={item.servicio} precio={item.precio} />
        </div>
            ))}
            </Slider>
        </div>
    );
    };

export default CardCarousel;