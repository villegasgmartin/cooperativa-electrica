import { Button } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import "../homeGuardia2/HomeGuardia2.css";
import { Link } from "react-router-dom";

const HomeGuardia = () => {
    return (
        <section className="HomeGuardia-container2">
       
       <div className="imagenGuardia2"></div>
                        <div className="HomeGuardia-infoContainer2">
                        <Fade triggerOnce={true} duration={800} direction="right" delay={300}>
                            <h2 className="HomeGuardia-title2">
                                Servicio <span className="color-title2">Eléctrico</span>
                            </h2>
                            <p className="HomeGuardia-description2">
                                La Cooperativa de Provisión de Electricidad de Mar del Plata es una entidad de bien público que brinda servicios de distribución de energía eléctrica a aproximadamente 5000 usuarios. También ofrece otros servicios como biblioteca y acceso a Internet por fibra óptica. La Cooperativa se compromete a brindar un servicio de calidad a sus asociados y a trabajar para mejorar la calidad de vida de la comunidad. 
                                <br />
                                <br />
                                La Cooperativa de Provisión de Electricidad de Mar del Plata, fundada con el propósito de satisfacer las necesidades energéticas de la región, ha crecido con los años para convertirse en una pieza fundamental del desarrollo local. Además de la distribución de energía eléctrica a más de 5000 usuarios, la cooperativa ha expandido sus servicios con una biblioteca comunitaria, promoviendo el acceso a la educación y la cultura, y un moderno sistema de Internet por fibra óptica, permitiendo la conectividad digital en la zona.
                            </p>
                            <div className="HomeGuardia-buttonContainer2">
                            <Link to={"/servicio-electrico"}>
                                <Button
                                    sx={{
                                        height: "60px",
                                        backgroundColor: "#12824c",
                                        fontFamily: "archivo",
                                        width: "100%"
                                    }}
                                    variant="contained"
                                    size="large"
                                >
                                    Leer más
                                </Button>
                            </Link>
                        </div>
                        </Fade>
                        </div>
                
               
           
        </section>
    );
};

export default HomeGuardia;