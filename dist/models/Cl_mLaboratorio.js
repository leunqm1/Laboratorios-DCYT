export default class Cl_mLaboratorio {
    _equipos;
    constructor() {
        this._equipos = [];
    }
    set equipos(lista) {
        this._equipos = lista;
    }
    get equipos() {
        return this._equipos;
    }
    obtenerEquiposReportados() {
        return this._equipos.filter(equipo => equipo.Reportado());
    }
    obtenerEquiposEnMantenimiento() {
        return this._equipos.filter(equipo => equipo.Mantenimiento());
    }
    obtenerEquiposDisponiblesEstudiantes() {
        return this._equipos.filter(equipo => equipo.Activo());
    }
}
//# sourceMappingURL=Cl_mLaboratorio.js.map