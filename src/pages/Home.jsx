import { Link } from 'react-router-dom';
import { usarNoticias } from '../contexts/ContextNoticias';
import TarjetaNoticia from '../components/CardNoticias';
import { useEffect } from 'react';

function Inicio() {
  const { elementosNoticias, cargando } = usarNoticias();

  // Selecciona las primeras 3 noticias para mostrar como destacadas
  const noticiasDestacadas = elementosNoticias.slice(0, 3);

  return (
    <>
      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="text-uppercase text-muted fw-bold mb-2 d-block">INFORMACIÓN</span>
              <h1 className="display-4 fw-bold mb-4">Noticias a destacar</h1>
              <p className="lead text-muted mb-4">
                Descubre noticias educativas, tecnológicas, turísticas y comerciales seleccionadas para ti día a día.
              </p>
              <div className="d-flex gap-3">
                <Link to="/noticias" className="btn btn-primary btn-lg">
                  Explorar noticias
                </Link>
                <Link to="/contacto" className="btn btn-outline-secondary btn-lg">
                  Contactar
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-white rounded-3 p-5 shadow-sm text-center">
                <p className="text-muted mb-0">Tu portal de información confiable</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Para leer esta semana</h2>
            <Link to="/noticias" className="text-decoration-none">
              Ver todas las noticias →
            </Link>
          </div>
          
          {cargando ? (
            <div className="text-center py-5">Cargando...</div>
          ) : (
            <div className="row g-4">
              {noticiasDestacadas.map(noticia => (
                <div className="col-md-4" key={noticia.id}>
                  <TarjetaNoticia noticia={noticia} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-3 mb-md-0">
              <h3 className="display-5 fw-bold">+100</h3>
              <p className="text-muted">Noticias publicadas</p>
            </div>
            <div className="col-md-8">
              <blockquote className="blockquote">
                <p className="mb-3">"Una plataforma excelente para mantenerse informado sobre las últimas tendencias."</p>
                <footer className="blockquote-footer">Usuario satisfecho</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">¿Tienes una historia para compartir?</h2>
          <p className="lead text-muted mb-4">Escríbenos y conecta tu iniciativa con nuevos lectores.</p>
          <Link to="/contacto" className="btn btn-dark btn-lg">
            Contactar
          </Link>
        </div>
      </section>
    </>
  );
}

export default Inicio;