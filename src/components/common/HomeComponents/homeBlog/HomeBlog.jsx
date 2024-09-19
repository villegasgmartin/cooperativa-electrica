20//Importaciones:
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import "../homeBlog/HomeBlog.css"
/*--------Para cambiar las imagenes del Blog del Home: agregar las nuevas imágenes en la carpeta "images" y
luego reemplazar la parte final de las rutas de aca abajo por el nombre de cada imagen nueva------------*/
import ImageA from "../../../../assets/images/homeBlog.jpeg"
import ImageB from "../../../../assets/images/homeBlog.jpeg"
import ImageC from "../../../../assets/images/homeBlog.jpeg"
import ImageD from "../../../../assets/images/homeBlog.jpeg"

//JSX:
const HomeBlog = () => {
  return (
    <div className='HomeBlog-container'>
      <div className='HomeBlog-textContainer'>
        <h2 className='HomeBlog-title'>Blog</h2>
        <p className='HomeBlog-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, praesentium distinctio. Iste, officia enim? Dolorum id at aliquid qui corrupti similique officiis eveniet nisi velit fugit voluptates, omnis, excepturi nam.</p>
      </div>
      <div className='HomeBlog-NoticiasContainer'>
        <div className='HomeBlog-noticia'>
          <img style={{ //Estilos de la imagen
              width: "300px",
              borderRadius: "20px",
              marginTop: "70px"}} 
              src={ImageA} 
              alt="descripción de la imagen" />
          <Link to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>Título Noticia</h3></Link> {/*Titulo de imágen*/}
        </div>
        <div className='HomeBlog-noticia'>
          <img style={{  //Estilos de la imagen
              width: "300px",
              borderRadius: "20px",
              marginTop: "70px"}} 
              src={ImageB} 
              alt="descripción de la imagen" />
          <Link to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>Título Noticia</h3></Link> {/*Titulo de imágen*/}
        </div>
        <div className='HomeBlog-noticia'>
          <img style={{  //Estilos de la imagen
              width: "300px",
              borderRadius: "20px",
              marginTop: "70px"}} 
              src={ImageC} 
              alt="descripción de la imagen" />
          <Link to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>Título Noticia</h3></Link> {/*Titulo de imágen*/}
        </div>
        <div className='HomeBlog-noticia'>
          <img style={{  //Estilos de la imagen
              width: "300px",
              borderRadius: "20px",
              marginTop: "70px"}} 
              src={ImageD} 
              alt="descripción de la imagen" />
          <Link to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>Título Noticia</h3></Link> {/*Titulo de imágen*/}
        </div>
      </div>
      <Link to={"/blog"}>
        <Button sx={{
            width: "230px", 
            height: "60px",
            fontFamily: "archivo",
            backgroundColor: "#12824c"}} 
            variant='contained' 
            size='large'
          >Ver más</Button> 
      </Link>
    </div>
  )
}

export default HomeBlog