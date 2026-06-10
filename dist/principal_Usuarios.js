import Cl_sEquipo from './services/Cl_sEquipo.js';
import Cl_cUsuarios from './controllers/Cl_cUsuarios.js';
// Instanciamos el servicio único que apunta a MockAPI
const servicio = new Cl_sEquipo();
async function arrancarAppUsuarios() {
    try {
        console.log("⏳ Descargando datos desde MockAPI...");
        // Ejecutamos la petición de forma directa
        const equiposDesdeNube = await servicio.getEquipos();
        console.log("✅ Datos recibidos con éxito. Cantidad de equipos:", equiposDesdeNube.length);
        // Encendemos el controlador exclusivo de usuarios
        new Cl_cUsuarios(equiposDesdeNube, servicio);
        console.log("🚀 ¡Panel de usuarios completamente operativo!");
    }
    catch (error) {
        console.error("❌ Error fatal al arrancar el panel de usuarios:", error);
        // Alerta visual por si la API se cayó o dio Timeout
        alert("No se pudo conectar con MockAPI. Revisa tu conexión a internet o el estado del servidor.");
    }
}
// Arrancamos de forma directa e inmediata aprovechando el contexto de módulo nativo
arrancarAppUsuarios();
//# sourceMappingURL=principal_Usuarios.js.map