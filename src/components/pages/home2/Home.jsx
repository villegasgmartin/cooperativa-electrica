//Importaciones:
import HomeBlog from "../../common/segundoHome/homeBlog/HomeBlog"
import HomeGuardia2 from "../../common/segundoHome/homeGuardia2/HomeGuardia2"
import HomePortada from "../../common/segundoHome/homePortada/HomePortada"
import HomeServicios from "../../common/segundoHome/homeServicios/HomeServicios"
import Footer from "../../common/layout/footer/Footer"
import "../home/Home.css"

//JSX:
const Home2 = () => {
    return (
        <div>
            <HomePortada/>
            <HomeServicios/>
            <HomeGuardia2/>
            <HomeBlog/>
            <Footer/>
        </div>
    )
}

export default Home2