import { useState, useMemo } from 'react';
import { usarNoticias } from '../contexts/ContextNoticias';
import TarjetaNoticia from '../components/CardNoticias';
import { useNavigate } from 'react-router-dom';

function Catalogo() {
  const navegar = useNavigate();
  const { elementosNoticias, cargando, recargarNoticias } = usarNoticias();
  
  const [terminoBusqueda, establecerTerminoBusqueda] = useState('');
  const [categoriaSeleccionada, establecerCategoriaSeleccionada] = useState('Todos');

  const categorias = ['Todos', ...new Set(elementosNoticias.map(elemento => elemento.categoria))];

  // Filtra noticias por categoría seleccionada y término de búsqueda (título o resumen)
  const noticiasFiltradas = useMemo(() => {
    return elementosNoticias.filter(elemento => {
      const coincideCategoria = categoriaSeleccionada === 'Todos' || elemento.categoria === categoriaSeleccionada;
      const coincideBusqueda = elemento.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                           elemento.resumen.toLowerCase().includes(terminoBusqueda.toLowerCase());
      return coincideCategoria && coincideBusqueda;
    });
  }, [elementosNoticias, categoriaSeleccionada, terminoBusqueda]);

  const manejarVerDetalle = (noticia) => {
    navegar(`/noticia/${noticia.id}`);
  };

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="fw-bold">Explora todas las noticias</h2>
        <p className="text-muted">Filtra por tema y encuentra experiencias de tu interés.</p>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4 align-items-center">
        {categorias.map(categoria => (
          <button
            key={categoria}
            className={`btn ${categoriaSeleccionada === categoria ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => establecerCategoriaSeleccionada(categoria)}
          >
            {categoria}
          </button>
        ))}
        <div className="ms-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={terminoBusqueda}
            onChange={(evento) => establecerTerminoBusqueda(evento.target.value)}
          />
        </div>
      </div>

      {cargando ? (
        <div className="text-center py-5">Cargando noticias...</div>
      ) : noticiasFiltradas.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No se encontraron noticias con esos criterios.</p>
        </div>
      ) : (
        <div className="row g-4">
          {noticiasFiltradas.map(noticia => (
            <div className="col-md-6 col-lg-3" key={noticia.id}>
              <TarjetaNoticia noticia={noticia} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalogo;