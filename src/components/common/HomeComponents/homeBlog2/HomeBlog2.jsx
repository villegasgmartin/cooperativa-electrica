//Importaciones:
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'
import "./HomeBlog2.css"

/*---------Imágenes del Blog: para cambiarlas, colocar las nuevas imágenes en la carpeta "blog", dentro de "images" y luego modificar
solo la parte final de las rutas que estan a continuacion por el nombre de las nuevas imágenes--------- */
import ImageA from "../../../../assets/images/blog/blog-image-01.jpg"
import ImageB from "../../../../assets/images/blog/blog-image-02.jpeg"
import ImageC from "../../../../assets/images/blog/blog-image-03.jpg"


//JSX:
const HomeBlog2 = () => {
  return (
    <section className='homeBlog-main-container'>
      <Fade triggerOnce={true} duration={900} delay={300}>
          <h2 className='homeBlog-title'>Blog</h2>
      </Fade>
      <Fade triggerOnce={true} duration={900} delay={300} direction='up'>
        <p className='homeBlog-description'>Bienvenidos al blog de nuestra cooperativa, un espacio donde compartimos información relevante sobre nuestros servicios de electricidad e internet, novedades tecnológicas, consejos para el uso eficiente de la energía, y mucho más.</p>
      </Fade>
      <div className='homeBlog-noticiasContainer'>
          <Fade cascade={true} duration={800} triggerOnce={true}>
            <div className='homeBlog-noticia noticia-01'>
              <Link to={"/el-consejo-de-administracion-recibe-diputado-provincial"}>
                <div className='homeBlog-img-container'>
                  <img className='homeBlog-img' 
                      src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1741429570/cooperativa/El_Consejo_de_Administracio%CC%81n_recibio%CC%81_a_Diputado_Provincial_-_foto_3_kupkpm.jpg" 
                      alt="blog noticia" />
                </div>
              </Link>
              <Link className='link-blog' to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>El Consejo de Administración recibió a Diputado Provincial</h3></Link>
            </div>
            <div className='homeBlog-noticia noticia-02'>
              <div className='homeBlog-img-container'>
                <Link to={"/cooperativa-electrica-en-encuentro-productivo-bonaerense"}>
                  <img className='homeBlog-img'
                      src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1741432842/cooperativa/Encuentro_Productivo_Bonaerense-1_ix5tsb.jpg"
                      alt="blog noticia"
                      />
                </Link>
              </div>
              <Link className='link-blog' to={"/blog"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>Cooperativa Eléctrica en Encuentro Productivo Bonaerense </h3></Link>
            </div>
            <div className='homeBlog-noticia noticia-03'>
              <div className='homeBlog-img-container'>
                <Link to={"/dia-de-la-mujer"}>
                  <img className='homeBlog-img'
                      src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1741895862/cooperativa/Dia_de_la_mujer_-_header_z6mwgy.jpg" 
                      alt="blog noticia" />
                </Link>
              </div>
              <Link className='link-blog' to={"/dia-de-la-mujer"} style={{textDecoration: "none"}}><h3 className='HomeBlog-noticiaTitle'>8 de marzo, Día Internacional de la Mujer Trabajadora
              </h3></Link>
            </div>
          </Fade>
        </div>
      <div className='homeBlog-buttonContainer'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
          <Link to={"/blog"}>
          <Button sx={{ 
              width: "100%",
              height: "100%",
              fontFamily: "interTight",
              fontSize: "25px",
              fontWeight: "bold",
              letterSpacing: "2px",
              borderRadius: "50px",
              boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
              textTransform: "none",
              color:"black",
              backgroundColor: "#2eed8d",
              }} 
              variant='contained' 
              size='large'
          >
              Ver más
          </Button>
          </Link>
        </Fade>
      </div>
    </section>
  )
}

export default HomeBlog2