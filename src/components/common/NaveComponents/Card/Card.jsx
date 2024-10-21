//Importaciones:
import { Button } from "@mui/material";
import "../Card/Card.css";
import { Link } from "react-router-dom";

//JSX:
const Card = ({servicio, precio}) => {
    return (
        <div className='card'>
            <div className="card-servicio-container">
                <p className="card-servicio">{servicio}</p>
            </div>
            <div className="card-info-container">
                <p className="card-precio-promo">Precio de lista <span className="tachado">$43000</span></p>
                <p className="card-precio">{precio}</p>
                <p className="card-precio-text">final por mes</p>
                <div className="card-button-container">
                    <Link to={"/formulario"}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#8048ff",
                                fontFamily: "archivo",
                                width: "100%",
                                height: "100%",
                                textTransform: "none",
                                fontSize: "16px"
                            }}
                        >¡Lo quiero!</Button>
                    </Link>
                </div>
                <p className="card-promo">46% OFF por 3 meses</p>
            </div>
        </div>
    );
    };

    export default Card;