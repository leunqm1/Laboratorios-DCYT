export default class Cl_vUsuarios {
    private inIdEquipo;
    private btReportarFalla;
    private tablaCuerpoUser;
    private filtroUbicacion;
    private filtroProcesador;
    private filtroMemoria;
    constructor();
    get idEquipo(): string;
    get tablaEquipo(): HTMLElement;
    get valoresFiltros(): {
        ubicacion: string;
        procesador: string;
        memoria: string;
    };
    onCambioFiltro(callback: () => void): void;
    onReportarFalla(callback: () => void): void;
    /**
     * 🎨 Método Core: Clona la plantilla HTML y la rellena con los datos puros.
     * Mapea de forma transparente 'reportado' de la BD a 'Fallando' para el estudiante.
     */
    /**
         * 🎨 Método Core: Clona la plantilla HTML y la rellena con los datos puros.
         * Adaptado con los Selectores de Clase unificados del HTML Final.
         */
    extraerDatos(equipoDatos: any, accionReportar: (id: string) => void): DocumentFragment;
}
//# sourceMappingURL=Cl_vUsuarios.d.ts.map