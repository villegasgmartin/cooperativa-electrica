//Importaciones:
import { Button } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import "./HomeGuardia2.css";
import { Link } from "react-router-dom";
import Image01 from "../../../../assets/images/inicio/servicio-electrico.jpg"

//JSX:
const HomeGuardia2 = () => {
    return (
        <section className="homeGuardia2-main-container">
                <Fade triggerOnce={true} duration={900} delay={300}>
                    <h2 className="homeGuardia2-title">Servicio Eléctrico</h2>
                </Fade>
                <div className="homeGuardia2-container">
                    <Fade triggerOnce={true} duration={900} delay={300} direction="left">
                        <p className="homeGuardia2-text01">La Cooperativa de Provisión de Electricidad de Mar del Plata es una entidad de bien público que brinda servicios de distribución de energía eléctrica a aproximadamente 5.000 usuarios.</p>
                    </Fade>
                    <Fade triggerOnce={true} duration={900} delay={300} direction="right">
                        <p className="homeGuardia2-text02">La Cooperativa se compromete a brindar un servicio de calidad a sus asociados y a trabajar para mejorar la calidad de vida de la comunidad.</p>
                    </Fade>
                    <Fade triggerOnce={true} duration={900} delay={300} direction="left">
                        <p className="homeGuardia2-text01">Fundada con el propósito de satisfacer las necesidades energéticas de la región, ha crecido con los años para convertirse en una pieza fundamental del desarrollo local. Además de la distribución de energía eléctrica, la cooperativa ha expandido sus servicios con una biblioteca comunitaria, promoviendo el acceso a la educación y la cultura, y un moderno sistema de Internet por fibra óptica, permitiendo la conectividad digital en la zona.</p>
                    </Fade>
                    <Fade triggerOnce={true} duration={900} delay={300}>
                        <div className="homeGuardia2-button">
                            <Link to={"/servicio-electrico"}>
                                <Button sx={{ 
                                    width: "100%",
                                    height: "100%",
                                    fontFamily: "interTight",
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                    letterSpacing: "2px",
                                    borderRadius: "50px",
                                    boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                                    textTransform: "none",
                                    color:"black",
                                    backgroundColor: "#2eed8d",
                                    }} 
                                    variant='contained' 
                                    size='large'
                                >
                                    Conocé Más
                                </Button>
                            </Link>
                        </div>
                    </Fade>
                    <Fade triggerOnce={true} duration={900} delay={300} direction="up">
                        <div className="homeGuardia2-img-container">
                            <img src={Image01} alt="Servicio ELéctrico" className="homeGuardia2-img"/>
                        </div>
                    </Fade>
                </div>
        </section>
    );
};

export default HomeGuardia2;