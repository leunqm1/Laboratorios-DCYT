import Cl_sEquipo from "../services/Cl_sEquipo.js";
import Cl_mEquipos from "../models/Cl_mEquipos.js";
export default class Cl_cUsuarios {
    private _modelo;
    private _vista;
    private _servicio;
    constructor(equiposIniciales: Cl_mEquipos[], servicio: Cl_sEquipo);
    mostrarEquiposEnPantalla(): void;
    private refrescarDatosDesdeNube;
}
//# sourceMappingURL=Cl_cUsuarios.d.ts.map