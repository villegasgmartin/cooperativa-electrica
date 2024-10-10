//Importaciones:
import HomeBlog2 from "../../common/segundoHome/homeBlog2/HomeBlog2"
import HomeGuardia2 from "../../common/segundoHome/homeGuardia2/HomeGuardia2"
import HomePortada from "../../common/segundoHome/homePortada/HomePortada"
import HomeServicios2 from "../../common/segundoHome/homeServicios2/HomeServicios2"
import Footer from "../../common/layout/footer/Footer"
import "../home/Home.css"

//JSX:
const Home2 = () => {
    return (
        <div>
            <HomePortada/>
            <HomeServicios2/>
            <HomeGuardia2/>
            <HomeBlog2/>
            <Footer/>
        </div>
    )
}

export default Home2