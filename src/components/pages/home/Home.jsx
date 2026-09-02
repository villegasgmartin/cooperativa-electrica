//Importaciones:
import HomePortada2 from "../../common/HomeComponents/homePortada/HomePortada"
import HomeServices3 from "../../common/HomeComponents/homeServices3/HomeServices3";
import HomeGuardia2 from "../../common/HomeComponents/homeGuardia2/HomeGuardia2";
import HomeBlog2 from "../../common/HomeComponents/homeBlog2/HomeBlog2";
import Footer from "../../common/layout/footer/Footer";
// import ModalHome from "../../../assets/images/logos/logo.png"
/*import { useState, useEffect } from "react"*/
import "../home/Home.css"
// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import { Button } from "@mui/material";

//JSX:
const Home = () => {


    // const [showImageModal, setShowImageModal] = useState(false);

    // useEffect(() => {
    //     const hasShownAlert = sessionStorage.getItem("homeAlertShown");

    //     if (!hasShownAlert) {
    //         const timer = setTimeout(() => {
    //             setShowImageModal(true);
    //             sessionStorage.setItem("homeAlertShown", "true");
    //         }, 3000);
    //         return () => clearTimeout(timer);
    //     }
    // }, []);

    // const closeModal = () => {
    //     setShowImageModal(false);
    // };


    return (
        <div>
            
 {/* {showImageModal && (
    <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={ModalHome} alt="Cooperativa Eléctrica" className="modal-image"/>
            
            <p className="modal-title" style={{ textAlign: "left", marginBottom: "15px" }}>
                <strong>Sr. Usuario:</strong><br /><br />
                Informamos que el próximo domingo 30 de agosto de 2026 realizaremos trabajos de mejoras en la red eléctrica.<br /><br />
                Por cuestiones de seguridad, el servicio se verá suspendido en el horario estimado de <strong>08:00 a.m. a 12:00 a.m.</strong> en las siguientes zonas:
            </p>

            <ul style={{ textAlign: "left", margin: "0 0 15px 20px", padding: 0, color: "white", fontSize: "inherit" }}>
                <li>Avenida Colón 3400 a 3900</li>
                <li>Jujuy 2203 (edificio)</li>
                <li>20 de Septiembre 2200 a 2232</li>
                <li>Guido 2200 a 2350</li>
            </ul>

            <p className="modal-title" style={{ textAlign: "left" }}>
                <strong>Importante:</strong><br />
                • Las líneas se consideran en tensión durante el tiempo anunciado para la suspensión del suministro.<br />
                • Ante inclemencias climáticas adversas, el corte se dejará sin efecto.<br />
                • El horario previsto es aproximado.<br /><br />
                Por favor, sepa disculpar las molestias.
            </p>
        </div>
    </div>
)} */}
            <HomePortada2/>
            <HomeServices3/>
            <HomeGuardia2/>
            <HomeBlog2/>
            <Footer/>
        </div>
    )
}

export default Home