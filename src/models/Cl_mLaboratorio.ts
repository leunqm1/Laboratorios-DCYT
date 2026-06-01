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
}