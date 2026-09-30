const CLAVE_ALMACENAMIENTO = 'noticias_favoritos';
const CLAVE_NOTICIAS = 'noticias_crud_data';

export const obtenerFavoritos = () => {
  try {
    const datosAlmacenados = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    return datosAlmacenados ? JSON.parse(datosAlmacenados) : [];
  } catch (error) {
    console.error('Error al leer favoritos:', error);
    return [];
  }
};

export const agregarFavorito = (noticia) => {
  try {
    const favoritos = obtenerFavoritos();
    if (!favoritos.find(elemento => elemento.id === noticia.id)) {
      favoritos.push(noticia);
      localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(favoritos));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error al agregar favorito:', error);
    return false;
  }
};

export const eliminarFavorito = (idNoticia) => {
  try {
    const favoritos = obtenerFavoritos();
    const favoritosFiltrados = favoritos.filter(elemento => elemento.id !== idNoticia);
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(favoritosFiltrados));
    return true;
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    return false;
  }
};

export const esFavorito = (idNoticia) => {
  const favoritos = obtenerFavoritos();
  return favoritos.some(elemento => elemento.id === idNoticia);
};

export const limpiarFavoritos = () => {
  try {
    localStorage.removeItem(CLAVE_ALMACENAMIENTO);
    return true;
  } catch (error) {
    console.error('Error al limpiar favoritos:', error);
    return false;
  }
};

export const obtenerDatosNoticias = async () => {
  try {

    const respuestaJson = await fetch('/data/noticias.json');
    
    if (!respuestaJson.ok) {
      throw new Error(`Error al cargar noticias.json (${respuestaJson.status})`);
    }
    
    const datosJson = await respuestaJson.json();
    
    // Resto de la función...
    const datosLocalesAlmacenados = localStorage.getItem(CLAVE_NOTICIAS);
    let cambiosLocales = datosLocalesAlmacenados ? JSON.parse(datosLocalesAlmacenados) : { agregados: [], eliminados: [] };
    
    const noticiasCombinadas = [...datosJson];
    const idsEliminados = cambiosLocales.eliminados || [];
    const noticiasAgregadas = cambiosLocales.agregados || [];
    
    const noticiasFiltradas = noticiasCombinadas.filter(noticia => !idsEliminados.includes(noticia.id));
    noticiasFiltradas.push(...noticiasAgregadas);
    
    return noticiasFiltradas;
  } catch (error) {
    console.error('Error al obtener datos de noticias:', error);
    // Respaldo: devolver cualquier elemento creado localmente
    const datosLocalesAlmacenados = localStorage.getItem(CLAVE_NOTICIAS);
    let cambiosLocales = datosLocalesAlmacenados ? JSON.parse(datosLocalesAlmacenados) : { agregados: [], eliminados: [] };
    return cambiosLocales.agregados || [];
  }
};

export const guardarCreacionNoticia = (noticia) => {
  try {
    const datosLocalesAlmacenados = localStorage.getItem(CLAVE_NOTICIAS);
    let cambios = datosLocalesAlmacenados ? JSON.parse(datosLocalesAlmacenados) : { agregados: [], eliminados: [] };
    
    if (!cambios.agregados) cambios.agregados = [];
    cambios.agregados.push(noticia);
    localStorage.setItem(CLAVE_NOTICIAS, JSON.stringify(cambios));
    return true;
  } catch (error) {
    console.error('Error al guardar creación de noticia:', error);
    return false;
  }
};

export const guardarEliminacionNoticia = (idNoticia) => {
  try {
    const datosLocalesAlmacenados = localStorage.getItem(CLAVE_NOTICIAS);
    let cambios = datosLocalesAlmacenados ? JSON.parse(datosLocalesAlmacenados) : { agregados: [], eliminados: [] };
    
    if (!cambios.eliminados) cambios.eliminados = [];
    if (!cambios.eliminados.includes(idNoticia)) {
      cambios.eliminados.push(idNoticia);
      localStorage.setItem(CLAVE_NOTICIAS, JSON.stringify(cambios));
    }
    return true;
  } catch (error) {
    console.error('Error al guardar eliminación de noticia:', error);
    return false;
  }
};