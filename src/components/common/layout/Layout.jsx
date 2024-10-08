// Importaciones:
import Footer from "../layout/footer/Footer"
import Header from "./header/Header"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import logoNaveBlanco from '../../../assets/images/Logo_Nave_blanco.png';
import LogoMutualBlanco from "../../../assets/images/Logo_Mutual_blanco.png"

// JSX:
const Layout = () => {
    const title = useSelector((state) => state.title.currentTitle);
    const location = useLocation();

    const isNavePage = location.pathname === '/nave';
    const isMutualPage = location.pathname === '/AMImutual'
    const isFormPage = location.pathname === '/formulario';


    return (
        <div>
            <Header 
                title={isNavePage || isMutualPage || isFormPage ? '' : title} 
                logo={isNavePage || isFormPage ? logoNaveBlanco : isMutualPage ? LogoMutualBlanco : undefined}
                isMutual={isMutualPage}
            />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;
