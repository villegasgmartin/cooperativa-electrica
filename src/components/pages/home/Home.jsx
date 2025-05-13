//Importaciones:
import HomePortada2 from "../../common/HomeComponents/homePortada/HomePortada"
import HomeServices3 from "../../common/HomeComponents/homeServices3/HomeServices3";
import HomeGuardia2 from "../../common/HomeComponents/homeGuardia2/HomeGuardia2";
import HomeBlog2 from "../../common/HomeComponents/homeBlog2/HomeBlog2";
import Footer from "../../common/layout/footer/Footer";
import ModalHome from "../../../assets/images/oferta300MB.jpg"
/*import { useState, useEffect } from "react"*/
import "../home/Home.css"
import BotonWhatsapp from "../../common/BotonWhatsapp/BotonWhatsapp";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@mui/material";

//JSX:
const Home = () => {


    const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        const hasShownAlert = sessionStorage.getItem("homeAlertShown");

        if (!hasShownAlert) {
            const timer = setTimeout(() => {
                setShowImageModal(true);
                sessionStorage.setItem("homeAlertShown", "true");
            }, 1000);
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
            <div className="modal-content">
                <img
                src={ModalHome}
                alt="modal del inicio"
                className="modal-image"
                />
                <Button
                  component={Link}
                  to="/formulario"
                  sx={{
                    width: "100%",
                    height: "40px",
                    fontFamily: "interTight",
                    marginTop: "10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                    borderRadius: "30px",
                    boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                    textTransform: "none",
                    color: "white",
                    backgroundColor: "#8048ff",
                  }}
                  variant="contained"
                  size="large"
                >
                  Contratá
                </Button>
            </div>
            </div>
        )}
           
            <HomePortada2/>
            <HomeServices3/>
            <HomeGuardia2/>
            <HomeBlog2/>
            <Footer/>
            <BotonWhatsapp/>
        </div>
    )
}

export default Home