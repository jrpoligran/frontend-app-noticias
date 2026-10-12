import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { usarNoticias } from '../contexts/ContextNoticias';
import { guardarCreacionNoticia, guardarEliminacionNoticia } from '../utils/almacenamiento';

function GestionNoticias() {
  const { elementosNoticias, recargarNoticias } = usarNoticias();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [cargando, establecerCargando] = useState(false);

  const alEnviar = async (datos) => {
    establecerCargando(true);
    
    // Crea nuevo elemento de noticia con ID único basado en timestamp
    const nuevaNoticia = {
      id: Date.now(),
      titulo: datos.titulo,
      categoria: datos.categoria.toUpperCase(),
      imagen: datos.imagen || 'https://un.placeholder.com/400x250/cccccc/ffffff',
      resumen: datos.descripcion,
      contenido: datos.descripcion,
      fecha: new Date().toISOString().split('T')[0]
    };

    const exito = guardarCreacionNoticia(nuevaNoticia);
    if (exito) {
      await recargarNoticias();
      alert('Noticia creada exitosamente');
      reset();
    } else {
      alert('Error al crear la noticia');
    }
    
    establecerCargando(false);
  };

  const manejarEliminar = async (idNoticia) => {
    if (window.confirm('¿Estás seguro de eliminar esta noticia?')) {
      guardarEliminacionNoticia(idNoticia);
      await recargarNoticias();
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="fw-bold">Gestionar noticias</h2>
        <p className="text-muted">Crea publicaciones nuevas y elimina las que ya no deben aparecer.</p>
      </div>

      <div className="row">
        <div className="col-lg-4 mb-4 mb-lg-0">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4">Nueva noticia</h5>
            
            <form onSubmit={handleSubmit(alEnviar)}>
              <div className="mb-3">
                <label htmlFor="titulo" className="form-label">Nombre *</label>
                <input
                  type="text"
                  id="titulo"
                  className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
                  {...register('titulo', { required: 'El título es requerido' })}
                />
                {errors.titulo && (
                  <div className="invalid-feedback">{errors.titulo.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="categoria" className="form-label">Categoría *</label>
                <select
                  id="categoria"
                  className={`form-select ${errors.categoria ? 'is-invalid' : ''}`}
                  {...register('categoria', { required: 'La categoría es requerida' })}
                >
                  <option value="">Seleccionar...</option>
                  <option value="educación">Educación</option>
                  <option value="tecnología">Tecnología</option>
                  <option value="turismo">Turismo</option>
                  <option value="comercio">Comercio</option>
                </select>
                {errors.categoria && (
                  <div className="invalid-feedback">{errors.categoria.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción breve *</label>
                <textarea
                  id="descripcion"
                  rows="3"
                  className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
                  {...register('descripcion', { 
                    required: 'La descripción es requerida',
                    minLength: { value: 10, message: 'Mínimo 10 caracteres' }
                  })}
                ></textarea>
                {errors.descripcion && (
                  <div className="invalid-feedback">{errors.descripcion.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="imagen" className="form-label">URL de Imagen *</label>
                <input
                  type="url"
                  id="imagen"
                  className={`form-control ${errors.imagen ? 'is-invalid' : ''}`}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  {...register('imagen', { required: 'La URL de imagen es requerida' })}
                />
                {errors.imagen && (
                  <div className="invalid-feedback">{errors.imagen.message}</div>
                )}
              </div>

              <div className="d-flex gap-2">
                <button 
                  type="submit" 
                  className="btn btn-dark flex-grow-1"
                  disabled={cargando}
                >
                  {cargando ? 'Creando...' : 'Crear noticia'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={reset}
                >
                  Limpiar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>NOTICIA</th>
                  <th>CATEGORÍA</th>
                  <th className="text-end">ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {elementosNoticias.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-4">
                      No hay noticias registradas
                    </td>
                  </tr>
                ) : (
                  elementosNoticias.map(noticia => (
                    <tr key={noticia.id}>
                      <td>
                        <strong>{noticia.titulo}</strong>
                        <div className="text-muted small">Publicada</div>
                      </td>
                      <td>{noticia.categoria}</td>
                      <td className="text-end">
                        <button 
                          className="btn btn-link text-danger p-0"
                          onClick={() => manejarEliminar(noticia.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GestionNoticias;