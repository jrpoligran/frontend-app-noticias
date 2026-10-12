import { useState } from 'react';
import { useForm } from 'react-hook-form';

function Contacto() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [enviado, establecerEnviado] = useState(false);

  // Simula lo que serìa el envío del formulario (en producción se conectaría a un API)
  const alEnviar = (datos) => {
    console.log('Formulario enviado:', datos);
    establecerEnviado(true);
    setTimeout(() => {
      establecerEnviado(false);
      reset();
    }, 3000);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <h2>Contacta con Sitio de noticias</h2>
          <p className="text-muted mb-4">Cuéntanos sobre una noticia, iniciativa o experiencia que deberíamos conocer.</p>
          
          <div className="mb-4">
            <p><strong>Email:</strong> contacto@sitiodenoticias.com</p>
            <p><strong>Teléfono:</strong> +57 300 0000000</p>
            <p><strong>Horario:</strong> Lun-Vie 8:00 - 17:00</p>
          </div>

          {enviado && (
            <div className="alert alert-success">
              ¡Mensaje enviado! Gracias, te responderemos en un plazo de 2 días hábiles.
            </div>
          )}
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4">
            <h4 className="mb-4">Envíanos un mensaje</h4>
            
            <form onSubmit={handleSubmit(alEnviar)}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre *</label>
                <input
                  type="text"
                  id="nombre"
                  className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                  {...register('nombre', { required: 'El nombre es requerido' })}
                />
                {errors.nombre && (
                  <div className="invalid-feedback">{errors.nombre.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico *</label>
                <input
                  type="email"
                  id="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  {...register('email', { 
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Correo inválido'
                    }
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="asunto" className="form-label">Asunto *</label>
                <input
                  type="text"
                  id="asunto"
                  className={`form-control ${errors.asunto ? 'is-invalid' : ''}`}
                  {...register('asunto', { required: 'El asunto es requerido' })}
                />
                {errors.asunto && (
                  <div className="invalid-feedback">{errors.asunto.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="mensaje" className="form-label">Mensaje *</label>
                <textarea
                  id="mensaje"
                  rows="5"
                  className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`}
                  {...register('mensaje', { required: 'El mensaje es requerido', minLength: { value: 10, message: 'Mínimo 10 caracteres' } })}
                ></textarea>
                {errors.mensaje && (
                  <div className="invalid-feedback">{errors.mensaje.message}</div>
                )}
              </div>

              <button type="submit" className="btn btn-dark w-100">
                Enviar mensaje
              </button>
              
              <small className="text-muted d-block mt-2">
                * Todos los campos son obligatorios
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;