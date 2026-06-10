import { iEquipo } from "../interfaces/Cl_iEquipo.js";

export default class Cl_vUsuarios {
  
    private inIdEquipo: HTMLInputElement;
    private btReportarFalla: HTMLButtonElement;
    
  
    private tablaCuerpoUser: HTMLElement;
    private filtroUbicacion: HTMLSelectElement;
    private filtroProcesador: HTMLSelectElement;
    private filtroMemoria: HTMLSelectElement;

    constructor() {
        // Vinculación con los IDs nativos del HTML de Bootstrap que pasaron tus compañeros
        this.inIdEquipo = <HTMLInputElement>document.getElementById("idEquipoUsuario");
        this.btReportarFalla = <HTMLButtonElement>document.getElementById("btReportarFalla");
        this.tablaCuerpoUser = <HTMLElement>document.getElementById("tablaCuerpoUser");
        
        // Selectores de los filtros de usuario
        this.filtroUbicacion = <HTMLSelectElement>document.getElementById("filtroUbicacionUser");
        this.filtroProcesador = <HTMLSelectElement>document.getElementById("filtroProcesadorUser");
        this.filtroMemoria = <HTMLSelectElement>document.getElementById("filtroMemoriaUser");
    }

    // 🔓 Getters públicos para que el controlador lea las intenciones del usuario
    get idEquipo(): string { 
        return this.inIdEquipo.value; 
    }
    
    get tablaEquipo(): HTMLElement { 
        return this.tablaCuerpoUser; 
    }

    get valoresFiltros() {
        return {
            ubicacion: this.filtroUbicacion.value,
            procesador: this.filtroProcesador.value,
            memoria: this.filtroMemoria.value
        };
    }

    // 👂 Manejadores de Eventos (Callbacks) para delegar al controlador
    public onCambioFiltro(callback: () => void): void {
        this.filtroUbicacion.onchange = () => callback();
        this.filtroProcesador.onchange = () => callback();
        this.filtroMemoria.onchange = () => callback();
    }

    public onReportarFalla(callback: () => void): void {
        this.btReportarFalla.onclick = () => callback();
    }

    /**
     * 🎨 Método Core: Clona la plantilla HTML y la rellena con los datos puros.
     * Mapea de forma transparente 'reportado' de la BD a 'Fallando' para el estudiante.
     */
/**
     * 🎨 Método Core: Clona la plantilla HTML y la rellena con los datos puros.
     * Adaptado con los Selectores de Clase unificados del HTML Final.
     */
    public extraerDatos(equipoDatos: any, accionReportar: (id: string) => void): DocumentFragment {
        const plantilla = <HTMLTemplateElement>document.getElementById("plantillaEquipos");
        const clon = document.importNode(plantilla.content, true);

        // Forzamos la lectura segura de las celdas usando los nombres exactos del JSON
        (clon.querySelector(".marca-equipo") as HTMLElement).textContent = equipoDatos.marca || "---";
        (clon.querySelector(".procesador-equipo") as HTMLElement).textContent = equipoDatos.procesador || "---";
        (clon.querySelector(".memoria-equipo") as HTMLElement).textContent = (equipoDatos.memoria || "0").toString() + " GB";
        (clon.querySelector(".ubicacion-equipo") as HTMLElement).textContent = equipoDatos.ubicacion || "---";
        (clon.querySelector(".meson-equipo") as HTMLElement).textContent = equipoDatos.meson || "---";
        (clon.querySelector(".puesto-equipo") as HTMLElement).textContent = equipoDatos.puesto || "---";

        // Manejo del Badge
        const badge = clon.querySelector(".estado-equipo") as HTMLElement;
        const estadoRaw = equipoDatos.estado ? equipoDatos.estado.toLowerCase() : 'activo';
        
        if (estadoRaw === 'activo') {
            badge.textContent = "Disponible";
            badge.className = "estado-equipo badge badge-activo small rounded-pill";
        } else if (estadoRaw === 'mantenimiento') {
            badge.textContent = "En Mantenimiento";
            badge.className = "estado-equipo badge badge-mantenimiento small rounded-pill";
        } else {
            badge.textContent = "Fallando";
            badge.className = "estado-equipo badge badge-fallando small rounded-pill";
        }

        // Configuración del botón de reportes
        const btnReportar = clon.querySelector(".btn-abrir-reporte") as HTMLButtonElement;
        
        if (btnReportar) {
            if (estadoRaw !== 'activo') {
                btnReportar.disabled = true;
                btnReportar.textContent = "Fuera de Servicio";
            } else {
                btnReportar.onclick = () => {
                    const modal = document.getElementById("modal-reporte") as HTMLElement;
                    const inIdModal = document.getElementById("idEquipoUsuario") as HTMLInputElement;
                    
                    if (inIdModal) {
                        inIdModal.value = equipoDatos.id || "";
                    }
                    if (modal) {
                        modal.classList.remove("d-none");
                    }
                    accionReportar(equipoDatos.id || "");
                };
            }
        }

        return clon;}}