import { createContext, useContext, useState, useEffect } from 'react';
import { obtenerDatosNoticias } from '../utils/almacenamiento';

const ContextoNoticias = createContext();

export const ProveedorNoticias = ({ children }) => {
  const [elementosNoticias, establecerElementosNoticias] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [errorGeneral, establecerErrorGeneral] = useState(null);

  const cargarNoticias = async () => {
    try {
      establecerCargando(true);
      const datosNoticias = await obtenerDatosNoticias();
      establecerElementosNoticias(datosNoticias);
      establecerErrorGeneral(null);
    } catch (err) {
      establecerErrorGeneral(err.message);
    } finally {
      establecerCargando(false);
    }
  };

  useEffect(() => {
    cargarNoticias();
  }, []);

  return (
    // Proveedor de contexto con noticias, estado de carga, errores y función para recargar
    <ContextoNoticias.Provider value={{ elementosNoticias, cargando, errorGeneral, recargarNoticias: cargarNoticias }}>
      {children}
    </ContextoNoticias.Provider>
  );
};

export const usarNoticias = () => {
  const contexto = useContext(ContextoNoticias);
  if (!contexto) {
    throw new Error('usarNoticias debe usarse dentro de ProveedorNoticias');
  }
  return contexto;
};