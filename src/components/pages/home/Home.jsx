//Importaciones:
import HomePortada2 from "../../common/HomeComponents/homePortada/HomePortada"
import HomeServices3 from "../../common/HomeComponents/homeServices3/HomeServices3";
import HomeGuardia2 from "../../common/HomeComponents/homeGuardia2/HomeGuardia2";
import HomeBlog2 from "../../common/HomeComponents/homeBlog2/HomeBlog2";
import Footer from "../../common/layout/footer/Footer";
import ModalHome from "../../../assets/images/logos/logo.png"
/*import { useState, useEffect } from "react"*/
import "../home/Home.css"
import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import { Button } from "@mui/material";

//JSX:
const Home = () => {


    const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        const hasShownAlert = sessionStorage.getItem("homeAlertShown");

        if (!hasShownAlert) {
            const timer = setTimeout(() => {
                setShowImageModal(true);
                sessionStorage.setItem("homeAlertShown", "true");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const closeModal = () => {
        setShowImageModal(false);
    };


    return (
        <div>
            
 {showImageModal && (
    <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={ModalHome} alt="Cooperativa Eléctrica" className="modal-image"/>
            
            <p className="modal-title" style={{ textAlign: "left", marginBottom: "15px" }}>
                <strong>Sr. Usuario:</strong><br /><br />
                Para cualquier consulta o incidencia, pueden contactar con Guardia Técnica en el 493 5777.<br /><br />
                <strong> Muchas gracias. </strong>
            </p>
        </div>
    </div>
)}
            <HomePortada2/>
            <HomeServices3/>
            <HomeGuardia2/>
            <HomeBlog2/>
            <Footer/>
        </div>
    )
}

export default Home