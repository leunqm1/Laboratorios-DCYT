import Cl_mEquipos from './models/Cl_mEquipos.js';
import Cl_sEquipo from './services/Cl_sEquipo.js';
import Cl_cLaboratorio from './controllers/Cl_cLaboratorio.js';

const servicio = new Cl_sEquipo();

const equiposIniciales: Cl_mEquipos[] = [
    new Cl_mEquipos("Dell",   "i5",      8,  "1", "1", "1", "activo",        ""), // 👈 Vacío
    new Cl_mEquipos("Hp",     "i7",      16, "2", "1", "2", "reportado",     "No enciende, emite pitidos"),
    new Cl_mEquipos("Lenovo", "i3",      8,  "3", "2", "1", "activo",        ""), // 👈 Vacío
    new Cl_mEquipos("Dell",   "i5",      16, "4", "2", "2", "activo",        ""), // 👈 Vacío
    new Cl_mEquipos("Asus",   "Ryzen 5", 16, "5", "3", "1", "Mantenimiento",  "Actualizando sistema operativo"),
    new Cl_mEquipos("Hp",     "i5",      8,  "6", "3", "2", "activo",        "")  // 👈 Vacío
];

async function arrancarAplicacion() {
    try {
        console.log("⏳ Descargando inventario de MockAPI...");
        let equiposDesdeNube = await servicio.getEquipos();
        if (equiposDesdeNube.length === 0) {
            console.log("⚠️ La API está vacía. Subiendo los 6 equipos con formato numérico...");
            
            for (const equipo of equiposIniciales) {
                await servicio.agregarEquipo(equipo);
            }
            
            console.log("✅ ¡Precarga exitosa!");
            equiposDesdeNube = await servicio.getEquipos();
        }

        console.log(`ℹ️ Inicializando controladores con ${equiposDesdeNube.length} equipos.`);
        const app = new Cl_cLaboratorio(equiposDesdeNube, servicio);

    } catch (error) {
        console.error("❌ Error crítico en el arranque:", error);
    }
}

document.addEventListener("DOMContentLoaded", arrancarAplicacion);