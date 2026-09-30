import { Link } from 'react-router-dom';

function TarjetaNoticia({ noticia, mostrarBotonFavorito = false }) {
  const manejarFavorito = (evento) => {
    evento.preventDefault();
    if (mostrarBotonFavorito && noticia.alAlternarFavorito) {
      noticia.alAlternarFavorito(noticia);
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <img 
        src={noticia.imagen} 
        className="card-img-top" 
        alt={noticia.titulo}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary mb-2 w-fit-content px-3">{noticia.categoria}</span>
        <h5 className="card-title">{noticia.titulo}</h5>
        <p className="card-text text-muted flex-grow-1">{noticia.resumen}</p>
        <div className="mt-auto">
          <Link to={`/noticia/${noticia.id}`} className="btn btn-outline-primary me-2">
            Ver más →
          </Link>
          {mostrarBotonFavorito && noticia.esFavorito !== undefined && (
            <button 
              className={`btn ${noticia.esFavorito ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={manejarFavorito}
            >
              {noticia.esFavorito ? '★ Guardado' : '☆ Guardar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TarjetaNoticia;