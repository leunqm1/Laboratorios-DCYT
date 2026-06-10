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
    contarEquiposInactivos(listaEquipos) {
        return listaEquipos.filter(eq => eq.estado === 'Reportado' || eq.estado === 'Mantenimiento').length;
    }
    calcularPorcentajeDañados(listaEquipos) {
        const total = listaEquipos.length;
        if (total === 0)
            return 0;
        const inactivos = this.contarEquiposInactivos(listaEquipos);
        return Math.round((inactivos / total) * 100);
    }
    equiposParaEstudiantes() {
        return this._equipos.filter(equipo => equipo.estado === 'Activo');
    }
}
//# sourceMappingURL=Cl_mLaboratorio.js.map