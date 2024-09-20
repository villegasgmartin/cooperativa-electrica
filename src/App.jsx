//Importaciones:
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/pages/home/Home.jsx"
import Blog from "./components/pages/blog/Blog.jsx"
import Comunicados from "./components/pages/comunicados/Comunicados.jsx"
import Valores from "./components/pages/valores/Valores.jsx"
import Consejo from "./components/pages/consejo/Consejo.jsx"
import Principios from "./components/pages/principios/Principios.jsx"
import Historia from "./components/pages/historia/Historia.jsx"
import ServicioElectrico from "./components/pages/servicioElectrico/ServicioElectrico.jsx"
import Laboratorio from "./components/pages/laboratorio/Laboratorio.jsx"
import Biblioteca from "./components/pages/biblioteca/Biblioteca.jsx"
import ProvinciaNet from "./components/pages/provinciaNet/ProvinciaNet.jsx"
import Mutual from "./components/pages/mutual/Mutual.jsx"
import FormasPago from "./components/pages/formasPago/FormasPago.jsx"
import ConsejosUtiles from "./components/pages/consejosUtiles/ConsejosUtiles.jsx"
import Nave from "./components/pages/nave/Nave.jsx"
import Contacto from "./components/pages/contacto/Contacto.jsx"
import Layout from "./components/common/layout/Layout.jsx"
import Form from "./components/pages/formulario/Form.jsx"

//JSX:
function App() {
  return  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route element={<Layout/>} >
          <Route path="/comunicados-institucionales" element={<Comunicados/>}/>
          <Route path="/valores" element={<Valores/>}/>
          <Route path="/consejo-de-administracion" element={<Consejo/>}/>
          <Route path="/principios-cooperativos" element={<Principios/>}/>
          <Route path="/historia" element={<Historia/>}/>
          <Route path="/servicio-electrico" element={<ServicioElectrico/>}/>
          <Route path="/laboratorio-de-medidores" element={<Laboratorio/>}/>
          <Route path="/biblioteca" element={<Biblioteca/>}/>
          <Route path="/provinciaNET" element={<ProvinciaNet/>}/>
          <Route path="/AMImutual" element={<Mutual/>}/>
          <Route path="/formas-de-pago" element={<FormasPago/>}/>
          <Route path="/consejos-utiles" element={<ConsejosUtiles/>}/>
          <Route path="/nave" element={<Nave/>} />
          <Route path="/contacto" element={<Contacto/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/formulario" element={<Form/>}/>
        </Route>
  </Routes>
</BrowserRouter>
}

export default App