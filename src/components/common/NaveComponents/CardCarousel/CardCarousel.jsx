//Importaciones:
import Slider from "react-slick";
import Card from '../Card/Card';
import './CardCarousel.css';

const CardCarousel = ({servicios , showArrowsAndDots}) => {
    
    // Configuración del carrusel
    const settings = {
    dots: showArrowsAndDots,
    arrows: showArrowsAndDots, 
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    autoplay: false,
    slidesToScroll: 1,
    responsive: [
    {
        breakpoint: 1110,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        },
    },
    {
        breakpoint: 820,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
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