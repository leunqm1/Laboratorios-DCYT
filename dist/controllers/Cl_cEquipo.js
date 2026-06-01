export default class Cl_cEquipo {
    _modeloLaboratorio;
    _vistaEquipo;
    _servicio;
    constructor(modelo, vista, servicio) {
        this._modeloLaboratorio = modelo;
        this._vistaEquipo = vista;
        this._servicio = servicio;
        this._vistaEquipo.onMantenimiento(() => {
            this.procesarAccion('Mantenimiento');
        });
        this._vistaEquipo.onResolver(() => {
            this.procesarAccion('activo');
        });
    }
    async procesarAccion(nuevoEstado) {
        const id = this._vistaEquipo.idEquipo;
        if (!id) {
            alert("Por favor, ingrese el ID del equipo.");
            return;
        }
        const equipo = this._modeloLaboratorio.equipos.find(eq => eq.id === id);
        if (equipo) {
            equipo.estado = nuevoEstado;
            console.log(`⏳ Sincronizando con MockAPI: Equipo ${id} cambiado a [${nuevoEstado}]...`);
            const exito = await this._servicio.actualizarEstadoEquipo(equipo);
            if (exito) {
                this._vistaEquipo.consolaData.dispatchEvent(new Event('actualizar'));
            }
            else {
                alert("Error de conexión al guardar los cambios en MockAPI.");
            }
        }
        else {
            alert(`El equipo con ID ${id} no existe en el sistema.`);
        }
    }
}
//# sourceMappingURL=Cl_cEquipo.js.map