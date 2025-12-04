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
import { Link } from "react-router";
import { Button } from "@mui/material";

//JSX:
const Home = () => {


    const [showImageModal, setShowImageModal] = useState(false);

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
            // <div className="modal-overlay" onClick={closeModal}>
            //     <div className="modal-content">
            //         <img src={ModalHome} alt="" className="modal-image"/>
            //     <p className="modal-title">Estimado usuario: le informamos que incorporamos los siguientes números telefónicos para el envío de facturas e información institucional por WhatsApp 
            //     </p>
            //         <div>
            //             <a href="https://api.whatsapp.com/send?phone=542233060278" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            //                 <p className="footer-info">223-3060278</p></a>
            //                     <a href="https://api.whatsapp.com/send?phone=542233060273" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            //                 <p className="footer-info">223-3060273</p></a>
            //                     <a href="https://api.whatsapp.com/send?phone=542234060274" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            //                 <p className="footer-info">223-4060274</p></a>
            //         </div>
            //     </div>
            // </div>
           
            //  <div className="modal-overlay" onClick={closeModal}>
            //     <div className="modal-content">
            //         <img src={ModalHome} alt="" className="modal-image"/>
            //     <p className="modal-title"> El martes 18 de noviembre la Cooperativa permanecerá cerrada por motivo del aniversario institucional. Celebramos 91 años de servicio. Muchas gracias.
            //     </p>
            //     </div>
            // </div>
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