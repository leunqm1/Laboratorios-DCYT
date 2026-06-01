import Cl_sEquipo from "../services/Cl_sEquipo.js";
import Cl_mEquipos from "../models/Cl_mEquipos.js";
export default class Cl_cLaboratorio {
    private _modelo;
    private _vista;
    private _servicio;
    private _controladorEquipo;
    constructor(equiposIniciales: Cl_mEquipos[], servicio: Cl_sEquipo);
    private refrescarDatosDesdeNube;
    /**
     * 📊 MUESTRA EL JSON CRUDO DIRECTO EN LA PANTALLA
     */
    mostrarEquiposEnPantalla(): void;
}
//# sourceMappingURL=Cl_cLaboratorio.d.ts.map