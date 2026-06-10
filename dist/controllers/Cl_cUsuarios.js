import Cl_mLaboratorio from "../models/Cl_mLaboratorio.js";
import Cl_vUsuarios from "../views/Cl_vUsuarios.js";
export default class Cl_cUsuarios {
    _modelo;
    _vista;
    _servicio;
    constructor(equiposIniciales, servicio) {
        this._modelo = new Cl_mLaboratorio();
        this._vista = new Cl_vUsuarios();
        this._servicio = servicio;
        this._modelo.equipos = equiposIniciales;
        this._vista.onCambioFiltro(() => {
            this.mostrarEquiposEnPantalla();
        });
        this._vista.onReportarFalla(async () => {
            const id = this._vista.idEquipo;
            if (!id) {
                alert("Por favor, ingrese el ID del equipo.");
                return;
            }
            const equipo = this._modelo.equipos.find(eq => eq.id === id);
            if (equipo) {
                equipo.estado = 'Reportado';
                const txtObservacion = document.getElementById("inp-descripcion-reporte").value;
                equipo.observacion = txtObservacion.trim() !== ""
                    ? txtObservacion
                    : "Falla reportada por el usuario desde el panel público.";
                console.log(`⚠️ Registrando reporte en MockAPI para el equipo ID: ${id}...`);
                const exito = await this._servicio.actualizarEstadoEquipo(equipo);
                if (exito) {
                    const modal = document.getElementById("modal-reporte");
                    if (modal)
                        modal.classList.add("d-none");
                    document.getElementById("inp-descripcion-reporte").value = "";
                    await this.refrescarDatosDesdeNube();
                }
                else {
                    alert("Error de conexión al guardar en MockAPI.");
                }
            }
            else {
                alert(`El equipo con ID ${id} no existe en el sistema.`);
            }
        });
        setTimeout(() => {
            this.mostrarEquiposEnPantalla();
        }, 50);
    }
    mostrarEquiposEnPantalla() {
        const contenedorHTML = this._vista.tablaEquipo;
        if (!contenedorHTML)
            return;
        contenedorHTML.innerHTML = "";
        const filtros = this._vista.valoresFiltros;
        const equiposDisponibles = this._modelo.equiposParaEstudiantes();
        console.log("🔍 Filtros detectados en el DOM al renderizar:", filtros);
        let listaFiltrada = equiposDisponibles.filter(equipo => {
            const cumpleLab = !filtros.ubicacion || filtros.ubicacion === "todos" || equipo.ubicacion === filtros.ubicacion;
            const cumpleProc = !filtros.procesador || filtros.procesador === "todos" || equipo.procesador === filtros.procesador;
            const cumpleMem = !filtros.memoria || filtros.memoria === "todos" || equipo.memoria.toString() === filtros.memoria;
            return cumpleLab && cumpleProc && cumpleMem;
        });
        console.log(`📊 Cantidad de equipos que superaron los filtros: ${listaFiltrada.length}`);
        listaFiltrada.forEach(equipo => {
            const tarjetaVisual = this._vista.extraerDatos(equipo.toJSON(), (idSeleccionado) => {
                console.log(`Abriendo modal de reportes para el equipo: ${idSeleccionado}`);
            });
            contenedorHTML.appendChild(tarjetaVisual);
        });
    }
    async refrescarDatosDesdeNube() {
        console.log("🔄 Sincronizando catálogo con los cambios de MockAPI...");
        try {
            const equiposActualizados = await this._servicio.getEquipos();
            this._modelo.equipos = equiposActualizados;
            this.mostrarEquiposEnPantalla();
        }
        catch (error) {
            console.error("❌ Error de sincronización asíncrona:", error);
        }
    }
}
//# sourceMappingURL=Cl_cUsuarios.js.map