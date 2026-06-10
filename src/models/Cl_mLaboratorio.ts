import Cl_mEquipos from "./Cl_mEquipos.js";

export default class Cl_mLaboratorio {
    private _equipos: Cl_mEquipos[];

    constructor() {
        this._equipos = [];
    }

    public set equipos(lista: Cl_mEquipos[]) {
        this._equipos = lista;
    }

    public get equipos(): Cl_mEquipos[] {
        return this._equipos;
    }
    public obtenerEquiposReportados(): Cl_mEquipos[] {
        return this._equipos.filter(equipo => equipo.Reportado());
    }
    public obtenerEquiposEnMantenimiento(): Cl_mEquipos[] {
        return this._equipos.filter(equipo => equipo.Mantenimiento());
    }

    public obtenerEquiposDisponiblesEstudiantes(): Cl_mEquipos[] {
        return this._equipos.filter(equipo => equipo.Activo());
    }

    public contarEquiposInactivos(listaEquipos: Cl_mEquipos[]): number {
    return listaEquipos.filter(eq => eq.estado === 'reportado' || eq.estado === 'Mantenimiento').length;
    }
    public calcularPorcentajeDañados(listaEquipos: Cl_mEquipos[]): number {
    const total = listaEquipos.length;
    if (total === 0) return 0;
    
    const inactivos = this.contarEquiposInactivos(listaEquipos);
    return Math.round((inactivos / total) * 100);
}   
}