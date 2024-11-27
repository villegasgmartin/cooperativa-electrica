//Importaciones:
import { Button } from "@mui/material";
import "../Card/Card.css";
import { Link } from "react-router-dom";

//JSX:
const Card = ({servicio, precio, precioLista, descuento}) => {

    const [mainText, ...subTextArray] = servicio.split(' ');
    const subText = subTextArray.join(' ');

    return (
        <div className='card'>
            <div className="card-servicio-container">
                <p className="card-servicio">
                    <span className="main-text">{mainText} </span> 
                    <span className="sub-text"> {subText}</span>
                </p>
            </div>
            <div className="card-info-container">
                <p className="card-precio-promo">Precio de lista <span className="tachado">{precioLista}</span></p>
                <div>
                    <p className="card-precio">{precio}</p>
                    <p className="card-precio-text">final por mes*</p>
                </div>
                <div className="card-button-container">
                    <Link to={"/formulario"}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#8048ff",
                                fontFamily: "interTight",
                                width: "100%",
                                height: "100%",
                                textTransform: "none",
                                fontSize: "25px",
                                letterSpacing: "1px",
                                borderRadius: "50px",
                                boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)"
                            }}
                        >¡Lo Quiero!</Button>
                    </Link>
                </div>
                <p className="card-promo">{descuento}</p>
            </div>
        </div>
    );
    };

    export default Card;