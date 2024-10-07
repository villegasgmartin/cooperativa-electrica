//Importaciones:
import HomeBlog from "../../common/HomeComponents/homeBlog/HomeBlog"
import HomeGuardia from "../../common/HomeComponents/homeGuardia/HomeGuardia"
import HomePortada from "../../common/HomeComponents/homePortada/HomePortada"
import HomeServicios from "../../common/HomeComponents/homeServicios/HomeServicios"
import Footer from "../../common/layout/footer/Footer"
import "../home/Home.css"

//JSX:
const Home = () => {
    return (
        <div>
            <HomePortada/>
            <HomeServicios/>
            <HomeGuardia/>
            <HomeBlog/>
            <Footer/>
        </div>
    )
}

export default Home