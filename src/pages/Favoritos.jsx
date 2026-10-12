import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TarjetaNoticia from '../components/CardNoticias';
import { obtenerFavoritos, eliminarFavorito, limpiarFavoritos } from '../utils/almacenamiento';

function Favoritos() {
  const navegar = useNavigate();
  const [favoritos, establecerFavoritos] = useState([]);

  // Carga favoritos desde localStorage y actualiza el estado
  const cargarFavoritos = () => {
    const favoritos = obtenerFavoritos();
    establecerFavoritos(favoritos);
  };

  useEffect(() => {
    cargarFavoritos();
  }, []);

  const manejarEliminarFavorito = (noticia) => {
    eliminarFavorito(noticia.id);
    cargarFavoritos();
  };

  const manejarLimpiarTodos = () => {
    if (window.confirm('¿Estás seguro de querer borrar toda la lista?')) {
      limpiarFavoritos();
      cargarFavoritos();
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="fw-bold">Noticias guardadas</h2>
        <p className="text-muted">Tus favoritos se conservan en este dispositivo.</p>
      </div>

      {favoritos.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted mb-3">No tienes noticias guardadas aún.</p>
          <button className="btn btn-primary" onClick={() => navegar('/noticias')}>
            Explorar noticias
          </button>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="mb-0">{favoritos.length} noticias guardadas</p>
            <button className="btn btn-link text-danger" onClick={manejarLimpiarTodos}>
              Vaciar lista
            </button>
          </div>
          
          <div className="row g-4">
            {favoritos.map(noticia => (
              <div className="col-md-6" key={noticia.id}>
                <TarjetaNoticia 
                  noticia={{ ...noticia, esFavorito: true, alAlternarFavorito: manejarEliminarFavorito }} 
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favoritos;