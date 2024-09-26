// Importaciones:
import Footer from "../layout/footer/Footer"
import Header from "./header/Header"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import logoNaveBlanco from '../../../assets/images/Logo_Nave_blanco.png'; // Ajusta la ruta a tu logo

// JSX:
const Layout = () => {
    const title = useSelector((state) => state.title.currentTitle);
    const location = useLocation(); // Obtener la ubicación actual

    // Verificar si estamos en la ruta de 'Nave'
    const isNavePage = location.pathname === '/nave'; // Asegúrate de que esta sea la ruta correcta

    return (
        <div>
            <Header title={isNavePage ? '' : title} logo={isNavePage ? logoNaveBlanco : undefined} />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;
