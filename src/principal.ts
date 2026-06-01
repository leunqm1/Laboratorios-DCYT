import Cl_mEquipos from './models/Cl_mEquipos.js';
import Cl_sEquipo from './services/Cl_sEquipo.js';
import Cl_cLaboratorio from './controllers/Cl_cLaboratorio.js';

const servicio = new Cl_sEquipo();
const equiposIniciales: Cl_mEquipos[] = [
    new Cl_mEquipos("Dell",   "i5",      8,  "Lab1", "activo"),
    new Cl_mEquipos("Hp",     "i7",      16, "Lab2", "reportado"),
    new Cl_mEquipos("Lenovo", "i3",      8,  "Lab3", "activo"),
    new Cl_mEquipos("Dell",   "i5",      16, "Lab4", "activo"),
    new Cl_mEquipos("Asus",   "Ryzen 5", 16, "Lab5", "Mantenimiento"),
    new Cl_mEquipos("Hp",     "i5",      8,  "Lab6", "activo")
];

async function arrancarAplicacion() {
    try {
        console.log("⏳ Descargando inventario de MockAPI...");
        let equiposDesdeNube = await servicio.getEquipos();

        if (equiposDesdeNube.length === 0) {
            console.log("⚠️ La API está vacía. Subiendo los 5 equipos de prueba...");
            for (const equipo of equiposIniciales) {
                await servicio.agregarEquipo(equipo);
            }
            
            console.log("✅ ¡Precarga completada con éxito!");
            equiposDesdeNube = await servicio.getEquipos();
        }

        console.log(`ℹ️ Inicializando controladores con ${equiposDesdeNube.length} equipos.`);
        const app = new Cl_cLaboratorio(equiposDesdeNube, servicio);

    } catch (error) {
        console.error("❌ Error crítico en el arranque:", error);
    }
}

document.addEventListener("DOMContentLoaded", arrancarAplicacion);