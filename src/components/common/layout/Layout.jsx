// Importaciones:
import Footer from "../layout/footer/Footer"
import Header from "./header/Header"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

// JSX:
const Layout = () => {
    const title = useSelector((state) => state.title.currentTitle);

    return (
        <div>
            <Header 
                title={title} 
            />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;
