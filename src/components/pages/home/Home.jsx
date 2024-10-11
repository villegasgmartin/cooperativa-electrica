//Importaciones:
import { useState, useEffect } from "react";
import HomeBlog from "../../common/HomeComponents/homeBlog/HomeBlog";
import HomeGuardia from "../../common/HomeComponents/homeGuardia/HomeGuardia";
import HomePortada from "../../common/HomeComponents/homePortada/HomePortada";
import HomeServicios from "../../common/HomeComponents/homeServicios/HomeServicios";
import Footer from "../../common/layout/footer/Footer";
import "../home/Home.css";
import ModalHome from "../../../assets/images/home-alert.jpeg"

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
            </div>
            </div>
        )}
        <HomePortada />
        <HomeServicios />
        <HomeGuardia />
        <HomeBlog />
        <Footer />
        </div>
    );
};

export default Home;
