//Importaciones:
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import "../homeBlog/HomeBlog.css"
/*--------Para cambiar las imagenes del Blog del Home: agregar las nuevas imágenes en la carpeta "images" y
luego reemplazar la parte final de las rutas de aca abajo por el nombre de cada imagen nueva------------*/
import ImageA from "../../../../assets/images/HomeBlog01.webp"
import ImageB from "../../../../assets/images/HomeBlog02.jpeg"
import ImageC from "../../../../assets/images/HomeBlog01.webp"
import ImageD from "../../../../assets/images/HomeBlog02.jpeg"
import { Fade } from 'react-awesome-reveal'

//JSX:
const HomeBlog = () => {
  return (
    <section className='HomeBlog-container'>
      <Fade triggerOnce={true}  delay={300}>
        <div className='HomeBlog-textContainer'>
          <h2 className='HomeBlog-title'>Blog</h2>
          <p className='HomeBlog-description'>Bienvenidos al blog de nuestra cooperativa, un espacio donde compartimos información relevante sobre nuestros servicios de electricidad e internet, novedades tecnológicas, consejos para el uso eficiente de la energía, y mucho más.</p>
        </div>
      </Fade>
      <div className='HomeBlog-NoticiasContainer'>
        <Fade cascade={true} duration={800} delay={300} triggerOnce={true} >
          <div className='HomeBlog-noticia'>
            <img className='HomeBlog-img' 
                src={ImageA} 
                alt="descripción de la imagen" />
            <Link to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>Título Noticia</h3></Link> {/*Titulo de imágen*/}
          </div>
          <div className='HomeBlog-noticia'>
            <img className='HomeBlog-img'
                src={ImageB} 
                alt="descripción de la imagen"
                />
            <Link to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>Título Noticia</h3></Link> {/*Titulo de imágen*/}
          </div>
          <div className='HomeBlog-noticia'>
            <img className='HomeBlog-img'
                src={ImageC} 
                alt="descripción de la imagen" />
            <Link to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>Título Noticia</h3></Link> {/*Titulo de imágen*/}
          </div>
          <div className='HomeBlog-noticia'>
            <img className='HomeBlog-img'
                src={ImageD} 
                alt="descripción de la imagen" />
            <Link to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>Título Noticia</h3></Link> {/*Titulo de imágen*/}
          </div>
        </Fade>
      </div>
      <Fade triggerOnce={true} duration={800} delay={300}>
        <div className='HomeBlog-buttonContainer'>
          <Link to={"/blog"}>
            <Button sx={{
                width: "100%", 
                height: "60px",
                fontFamily: "archivo",
                backgroundColor: "#12824c"
              }} 
                variant='contained' 
                size='large'
              >Ver más</Button> 
          </Link>
        </div>
      </Fade>
    </section>
  )
}

export default HomeBlog