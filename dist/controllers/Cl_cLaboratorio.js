import Cl_mLaboratorio from "../models/Cl_mLaboratorio.js";
import Cl_vEquipo from "../views/Cl_vEquipo.js";
import Cl_cEquipo from "./Cl_cEquipo.js";
export default class Cl_cLaboratorio {
    _modelo;
    _vista;
    _servicio;
    _controladorEquipo;
    constructor(equiposIniciales, servicio) {
        this._modelo = new Cl_mLaboratorio();
        this._vista = new Cl_vEquipo();
        this._servicio = servicio;
        this._vista.onCambioFiltro(() => {
            this.mostrarEquiposEnPantalla();
        });
        this._modelo.equipos = equiposIniciales;
        this._controladorEquipo = new Cl_cEquipo(this._modelo, this._vista, this._servicio);
        this._vista.tablaEquipo.addEventListener('actualizar', async () => {
            await this.refrescarDatosDesdeNube();
        });
        this.mostrarEquiposEnPantalla();
    }
    mostrarEquiposEnPantalla() {
        const contenedorHTML = this._vista.tablaEquipo;
        contenedorHTML.innerHTML = "";
        const filtros = this._vista.valoresFiltros;
        let listaFiltrada = this._modelo.equipos.filter(equipo => {
            const cumpleLab = filtros.ubicacion === "todos" || equipo.ubicacion === filtros.ubicacion;
            const cumpleProc = filtros.procesador === "todos" || equipo.procesador === filtros.procesador;
            const cumpleMem = filtros.memoria === "todos" || equipo.memoria.toString() === filtros.memoria;
            const cumpleEst = filtros.estado === "todos" || equipo.estado === filtros.estado;
            return cumpleLab && cumpleProc && cumpleMem && cumpleEst;
        });
        const total = listaFiltrada.length;
        const inactivos = this._modelo.contarEquiposInactivos(listaFiltrada);
        const porcentaje = this._modelo.calcularPorcentajeDañados(listaFiltrada);
        this._vista.actualizarEstadisticas(total, inactivos, porcentaje);
        listaFiltrada.forEach(equipo => {
            const datosLimpios = equipo.toJSON();
            const filaVisual = this._vista.extraerDatos(datosLimpios);
            contenedorHTML.appendChild(filaVisual);
        });
    }
    async refrescarDatosDesdeNube() {
        console.log("🔄 Sincronizando cambios con MockAPI...");
        const equiposActualizados = await this._servicio.getEquipos();
        this._modelo.equipos = equiposActualizados;
        this.mostrarEquiposEnPantalla();
    }
}
//# sourceMappingURL=Cl_cLaboratorio.js.map