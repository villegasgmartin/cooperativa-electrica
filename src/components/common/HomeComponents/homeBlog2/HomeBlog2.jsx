//Importaciones:
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'
import "./HomeBlog2.css"

/*---------Imágenes del Blog: para cambiarlas, colocar las nuevas imágenes en la carpeta "blog", dentro de "images" y luego modificar
solo la parte final de las rutas que estan a continuacion por el nombre de las nuevas imágenes--------- */
import ImageA from "../../../../assets/images/blog/blog-image-01.webp"
import ImageB from "../../../../assets/images/blog/blog-image-02.jpeg"
import ImageC from "../../../../assets/images/blog/blog-image-03.jpg"
import ImageD from "../../../../assets/images/blog/blog-image-04.jpeg"


//JSX:
const HomeBlog2 = () => {
  return (
    <section className='HomeBlog-container2'>
      <Fade triggerOnce={true}  delay={300}>
        <div className='HomeBlog-textContainer'>
          <h2 className='HomeBlog-title'>Blog</h2>
          <p className='HomeBlog-description'>Bienvenidos al blog de nuestra cooperativa, un espacio donde compartimos información relevante sobre nuestros servicios de electricidad e internet, novedades tecnológicas, consejos para el uso eficiente de la energía, y mucho más.</p>
        </div>
      </Fade>
      <div className='HomeBlog-main-NoticiasContainer'>
        <div className='HomeBlog-NoticiasContainer'>
          <Fade cascade={true} duration={800} triggerOnce={true} >
            <div className='HomeBlog-noticia'>
              <Link to={"/blog"}>
                <img className='HomeBlog-img' 
                    src={ImageA} 
                    alt="descripción de la imagen" />
              </Link>
              <Link className='link-blog' to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>Título Noticia</h3></Link>
            </div>
            <div className='HomeBlog-noticia'>
              <Link to={"/blog"}>
                <img className='HomeBlog-img'
                    src={ImageB} 
                    alt="descripción de la imagen"
                    />
              </Link>
              <Link className='link-blog' to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>Título Noticia</h3></Link>
            </div>
          </Fade>
        </div>
        <div className='HomeBlog-NoticiasContainer'>
          <Fade cascade={true} duration={800} triggerOnce={true}>
          <div className='HomeBlog-noticia'>
              <Link to={"/blog"}>
                <img className='HomeBlog-img'
                    src={ImageC} 
                    alt="descripción de la imagen" />
              </Link>
              <Link className='link-blog' to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>Título Noticia</h3></Link>
            </div>
            <div className='HomeBlog-noticia'>
              <Link to={"/blog"}>
                <img className='HomeBlog-img'
                    src={ImageD} 
                    alt="descripción de la imagen"/>
              </Link>
              <Link className='link-blog' to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>Título Noticia</h3></Link>
            </div>
          </Fade>
        </div>
      </div>
      <div className='HomeBlog-buttonContainer'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
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
        </Fade>
      </div>
    </section>
  )
}

export default HomeBlog2