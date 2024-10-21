//Importaciones:
import HomePortada2 from "../../common/HomeComponents/homePortada/HomePortada"
import HomeServices3 from "../../common/HomeComponents/homeServices3/HomeServices3";
import HomeGuardia2 from "../../common/HomeComponents/homeGuardia2/HomeGuardia2";
import HomeBlog2 from "../../common/HomeComponents/homeBlog2/HomeBlog2";
import Footer from "../../common/layout/footer/Footer";
/*import ModalHome from "../../../assets/images/home-alert.jpeg"*/
/*import { useState, useEffect } from "react"*/
import "../home/Home.css"

//JSX:
const Home = () => {

/*
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
*/

    return (
        <div>
            {/*
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
            */}
            <HomePortada2/>
            <HomeServices3/>
            <HomeGuardia2/>
            <HomeBlog2/>
            <Footer/>
        </div>
    )
}

export default Home