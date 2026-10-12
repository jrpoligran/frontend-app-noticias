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
    
    const datosLocalesAlmacenados = localStorage.getItem(CLAVE_NOTICIAS);
    let cambiosLocales = datosLocalesAlmacenados 
      ? JSON.parse(datosLocalesAlmacenados) 
      : { agregados: [], eliminados: [] };
    
    // Normaliza la estructura
    const idsEliminados = new Set(cambiosLocales.eliminados || []);
    const noticiasAgregadas = cambiosLocales.agregados || [];
    
    // Filtra el JSON contra eliminados
    const noticiasDelJson = datosJson.filter(noticia => !idsEliminados.has(noticia.id));
  
    const agregadasActivas = noticiasAgregadas.filter(noticia => !idsEliminados.has(noticia.id));
    
    return [...noticiasDelJson, ...agregadasActivas];
  } catch (error) {
    console.error('Error al obtener datos de noticias:', error);
    
    // El respaldo/backup también respeta los eliminados
    const datosLocalesAlmacenados = localStorage.getItem(CLAVE_NOTICIAS);
    let cambiosLocales = datosLocalesAlmacenados 
      ? JSON.parse(datosLocalesAlmacenados) 
      : { agregados: [], eliminados: [] };
    
    const idsEliminados = new Set(cambiosLocales.eliminados || []);
    const agregadasActivas = (cambiosLocales.agregados || []).filter(
      noticia => !idsEliminados.has(noticia.id)
    );
    return agregadasActivas;
  }
};

export const guardarCreacionNoticia = (noticia) => {
  try {
    const datosLocalesAlmacenados = localStorage.getItem(CLAVE_NOTICIAS);
    let cambios = datosLocalesAlmacenados ? JSON.parse(datosLocalesAlmacenados) : { agregados: [], eliminados: [] };
    
    // Asegura que el array de agregados exista antes de insertar
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
    
    // Asegura que el array de eliminados exista y evita duplicados
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