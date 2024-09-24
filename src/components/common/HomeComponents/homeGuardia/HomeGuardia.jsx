import { Button } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import "../homeGuardia/HomeGuardia.css";
import { Link } from "react-router-dom";

const HomeGuardia = () => {
    return (
        <section className="HomeGuardia-container">
            <Fade className="HomeGuardia-infoContainer"  triggerOnce={true} duration={800}>
                    <div className="HomeGuardia-infoContainer">
                        <h2 className="HomeGuardia-title">
                            Servicio <span className="color-title">Eléctrico</span>
                        </h2>
                        <p className="HomeGuardia-description">
                            La Cooperativa de Provisión de Electricidad de Mar del Plata es una entidad de bien público que brinda servicios de distribución de energía eléctrica a aproximadamente 5000 usuarios. También ofrece otros servicios como biblioteca y acceso a Internet por fibra óptica. La Cooperativa se compromete a brindar un servicio de calidad a sus asociados y a trabajar para mejorar la calidad de vida de la comunidad.
                        </p>
                        <Link to={"/servicio-electrico"}>
                            <Button
                                sx={{
                                    marginTop: "5px",
                                    backgroundColor: "#12824c",
                                    fontFamily: "archivo",
                                }}
                                variant="contained"
                                size="large"
                            >
                                Leer más
                            </Button>
                        </Link>
                    </div>
            </Fade>
        </section>
    );
};

export default HomeGuardia;