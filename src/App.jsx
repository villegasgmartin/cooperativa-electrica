//Importaciones:
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Blog from "./components/pages/blog/Blog.jsx"
import Comunicados from "./components/pages/comunicados/Comunicados.jsx"
import Consejo from "./components/pages/consejo/Consejo.jsx"
import Principios from "./components/pages/principios/Principios.jsx"
import Historia from "./components/pages/historia/Historia.jsx"
import ServicioElectrico from "./components/pages/servicioElectrico/ServicioElectrico.jsx"
import Laboratorio from "./components/pages/laboratorio/Laboratorio.jsx"
import Biblioteca from "./components/pages/biblioteca/Biblioteca.jsx"
import Mutual from "./components/pages/mutual/Mutual.jsx"
import FormasPago from "./components/pages/formasPago/FormasPago.jsx"
import ConsejosUtiles from "./components/pages/consejosUtiles/ConsejosUtiles.jsx"
import Nave from "./components/pages/nave/Nave.jsx"
import Contacto from "./components/pages/contacto/Contacto.jsx"
import Layout from "./components/common/layout/Layout.jsx"
import Form from "./components/pages/formulario/Form.jsx"
import Preguntas from "./components/pages/preguntas/Preguntas.jsx"
import Objetivos from "./components/pages/objetivos/Objetivos.jsx"
import BlogNoticia1 from "./components/pages/blogNoticia1/BlogNoticia1.jsx"
import BlogNoticia2 from "./components/pages/blogNoticia2/BlogNoticia2.jsx"
import BlogNoticia3 from "./components/pages/blogNoticia3/BlogNoticia3.jsx"
import BlogNoticia4 from "./components/pages/blogNoticia4/BlogNoticia4.jsx"
import BlogNoticia5 from "./components/pages/blogNoticia5/BlogNoticia5.jsx"
import BlogNoticia6 from "./components/pages/blogNoticia6/BlogNoticia6.jsx"

import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop.jsx"
import BotonScroll from "./components/common/BotonScroll/BotonScroll.jsx"
import Home from "./components/pages/home/Home.jsx"
import BotonWhatsapp from "./components/common/BotonWhatsapp/BotonWhatsapp.jsx"
import { Virtual } from "swiper/modules"
import Vital from "./components/pages/vital/Vital.jsx"
import Oculta from "./components/pages/oculta/Oculta.jsx"
import Blognoticia9 from "./components/pages/blogNoticia9/BlogNoticia9.jsx"
import Blognoticia7 from "./components/pages/blogNoticia7/BlogNoticia7.jsx"
import Blognoticia8 from "./components/pages/blogNoticia8/BlogNoticia8.jsx"

//JSX:
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route element={<Layout />}>
          <Route path="/comunicados-institucionales" element={<Comunicados />} />
          <Route path="/consejo-de-administracion" element={<Consejo />} />
          <Route path="/principios-cooperativos" element={<Principios />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/servicio-electrico" element={<ServicioElectrico />} />
          <Route path="/laboratorio-de-medidores" element={<Laboratorio />} />
          <Route path="/objetivos-sociales" element={<Objetivos />} />
          <Route path="/consejos-utiles" element={<ConsejosUtiles />} />
          <Route path="/preguntas-frecuentes" element={<Preguntas />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/como-ahorrar-energia" element={<BlogNoticia1 />} />
          <Route path="/energias-renovables" element={<BlogNoticia2 />} />
          <Route path="/las-claves-de-la-velocidad-de-internet" element={<BlogNoticia3 />} />
          <Route path="/el-consejo-de-administracion-recibe-diputado-provincial" element={<BlogNoticia4 />} />
          <Route path="/cooperativa-electrica-en-encuentro-productivo-bonaerense" element={<BlogNoticia5 />} />
          <Route path="/dia-de-la-mujer" element={<BlogNoticia6 />} />
          <Route path="/8m-reflexiones-cooperativas-con-perspectiva-de-genero" element={<Blognoticia8 />} />
          <Route path="/cooperativa-electrica-en-clinica-fiscalizate" element={<Blognoticia7 />} />
          <Route path="/nueva-modalidad-pago-facturas-qr" element={<Blognoticia9 />} />
          

        </Route>
        
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/AMImutual" element={<Mutual />} />
        <Route path="/vittal" element={<Vital />} />
        <Route path="/formas-de-pago" element={<FormasPago />} />
        <Route path="/nave" element={<Nave />} />
        <Route path="/formulario" element={<Form />} />
        <Route path="/promo-asociado-nave" element={<Oculta />} />

      </Routes>
      <BotonScroll />
    </BrowserRouter>
  );
}

export default App;