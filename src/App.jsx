import { Routes, Route } from 'react-router-dom';
import Diseno from './components/Layout';
import Inicio from './pages/Home';
import Catalogo from './pages/Catalogo';
import DetalleNoticia from './pages/DetalleNoticia';
import Favoritos from './pages/Favoritos';
import Contacto from './pages/Contacto';
import GestionNoticias from './pages/GestionNoticias';

function Aplicacion() {
  return (
    <Routes>
      <Route path="/" element={<Diseno />}>
        <Route index element={<Inicio />} />
        <Route path="noticias" element={<Catalogo />} />
        <Route path="noticia/:id" element={<DetalleNoticia />} />
        <Route path="favoritos" element={<Favoritos />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="gestion" element={<GestionNoticias />} />
      </Route>
    </Routes>
  );
}

export default Aplicacion;