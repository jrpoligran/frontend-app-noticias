import { Link, Outlet } from 'react-router-dom';

function Diseno() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="bg-white shadow-sm sticky-top">
        <nav className="container navbar navbar-expand-lg navbar-light py-3">
          <Link className="navbar-brand fw-bold" to="/">
            <span className="me-2">⬛</span>Sitio de noticias
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/noticias">Noticias</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/favoritos">Favoritos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gestion">Gestión</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <footer className="bg-dark text-light py-4 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5 className="mb-3">Sitio de noticias</h5>
              <p className="mb-0">Noticias y experiencias para descubrir tu entorno.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-2">contacto@sitiodenoticias.com</p>
              <p className="mb-0">+57 300 0000 0000 | Ciudad, País</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Diseno;