
// Importaciones:
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Blog from "./components/pages/blog/Blog.jsx";
import Comunicados from "./components/pages/comunicados/Comunicados.jsx";
import Consejo from "./components/pages/consejo/Consejo.jsx";
import Principios from "./components/pages/principios/Principios.jsx";
import Historia from "./components/pages/historia/Historia.jsx";
import ServicioElectrico from "./components/pages/servicioElectrico/ServicioElectrico.jsx";
import Laboratorio from "./components/pages/laboratorio/Laboratorio.jsx";
import Biblioteca from "./components/pages/biblioteca/Biblioteca.jsx";
import Mutual from "./components/pages/mutual/Mutual.jsx";
import Vital from "./components/pages/vital/Vital.jsx";
import Oculta from "./components/pages/oculta/Oculta.jsx";
import FormasPago from "./components/pages/formasPago/FormasPago.jsx";
import ConsejosUtiles from "./components/pages/consejosUtiles/ConsejosUtiles.jsx";
import Nave from "./components/pages/nave/Nave.jsx";
import Contacto from "./components/pages/contacto/Contacto.jsx";
import Layout from "./components/common/layout/Layout.jsx";
import Form from "./components/pages/formulario/Form.jsx";
import Preguntas from "./components/pages/preguntas/Preguntas.jsx";
import Objetivos from "./components/pages/objetivos/Objetivos.jsx";
import BlogNoticia1 from "./components/pages/blogNoticia1/BlogNoticia1.jsx";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop.jsx";
import BotonScroll from "./components/common/BotonScroll/BotonScroll.jsx";
import Home from "./components/pages/home/Home.jsx";
import Dashboard from "./components/pages/dashboard/Dashboard.jsx";
import Login from "./components/pages/login/Login.jsx";
import NewPassword from "./components/pages/newPassword/NewPassword.jsx";
import PreguntasNave from "./components/pages/preguntasNave/PreguntasNave.jsx";
import OcultaVittal from "./components/pages/oculta-vittal/Oculta-Vittal.jsx";


// Componente separado para manejar rutas y lógica
function AppContent() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/actualizar-clave" element={<NewPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
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

        </Route>

        <Route path="/blog/:path" element={<BlogNoticia1 />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/AMImutual" element={<Mutual />} />
        <Route path="/vittal" element={<Vital />} />
        <Route path="/formas-de-pago" element={<FormasPago />} />
        <Route path="/nave" element={<Nave />} />
        <Route path="/preguntas-nave" element={<PreguntasNave />} />
        <Route path="/formulario" element={<Form />} />
        <Route path="/promo-asociado-nave" element={<Oculta />} />
        <Route path="/vittal-promo" element={<OcultaVittal />} />

      </Routes>

      {location.pathname !== "/dashboard" && location.pathname !== "/login" && location.pathname !== "/actualizar-clave" && <BotonScroll />}
    </>
  );
}

// Componente principal
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
