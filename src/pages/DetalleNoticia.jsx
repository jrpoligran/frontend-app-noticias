import { useParams, useNavigate } from 'react-router-dom';
import { usarNoticias } from '../contexts/ContextNoticias';
import { useEffect, useState } from 'react';
import { esFavorito, agregarFavorito, eliminarFavorito } from '../utils/almacenamiento';

function DetalleNoticia() {
  const { id } = useParams();
  const navegar = useNavigate();
  const { elementosNoticias, cargando } = usarNoticias();

  const noticia = elementosNoticias.find(elemento => elemento.id.toString() === id);
  const [esFav, establecerEsFav] = useState(false);

  const alternarFavorito = () => {
    if (esFav) {
      eliminarFavorito(noticia.id);
    } else {
      agregarFavorito(noticia);
    }
    establecerEsFav(!esFav);
  };

  useEffect(() => {
    establecerEsFav(esFavorito(noticia?.id));
  }, [noticia]);

  if (cargando) {
    return <div className="container py-5 text-center">Cargando...</div>;
  }

  if (!noticia) {
    return (
      <div className="container py-5 text-center">
        <h2>Noticia no encontrada</h2>
        <button className="btn btn-primary mt-3" onClick={() => navegar('/noticias')}>
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button 
        className="btn btn-link ps-0 mb-4 text-decoration-none"
        onClick={() => navegar('/noticias')}
      >
        ← Volver a noticias
      </button>

      <div className="row">
        <div className="col-lg-8">
          <span className="badge bg-secondary mb-3">{noticia.categoria}</span>
          <h1 className="display-5 fw-bold mb-3">{noticia.titulo}</h1>
          <p className="lead text-muted mb-4">{noticia.resumen}</p>
          
          <img 
            src={noticia.imagen} 
            className="img-fluid rounded-3 mb-4" 
            alt={noticia.titulo}
          />
          
          <div className="contenido">
            <p>{noticia.contenido}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: '100px' }}>
            <h5 className="fw-bold mb-3">¿Te interesa?</h5>
            <button 
              className={`btn ${esFav ? 'btn-warning w-100 mb-3' : 'btn-outline-warning w-100 mb-3'}`}
              onClick={alternarFavorito}
            >
              {esFav ? '★ Guardado en favoritos' : '☆ Agregar a favoritos'}
            </button>
            <button 
              className="btn btn-dark w-100"
              onClick={() => navegar('/contacto')}
            >
              Contactar organización
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleNoticia;