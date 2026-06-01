import Cl_mLaboratorio from "../models/Cl_mLaboratorio.js";
import Cl_vEquipo from "../views/Cl_vEquipo.js";
import Cl_sEquipo from "../services/Cl_sEquipo.js";
import Cl_mEquipos from "../models/Cl_mEquipos.js";
import Cl_cEquipo from "./Cl_cEquipo.js";

export default class Cl_cLaboratorio {
    private _modelo: Cl_mLaboratorio;
    private _vista: Cl_vEquipo;
    private _servicio: Cl_sEquipo;
    private _controladorEquipo: Cl_cEquipo;


    constructor(equiposIniciales: Cl_mEquipos[], servicio: Cl_sEquipo) {
        this._modelo = new Cl_mLaboratorio();
        this._vista = new Cl_vEquipo();
        this._servicio = servicio;
        
        this._modelo.equipos = equiposIniciales;
        this._controladorEquipo = new Cl_cEquipo(this._modelo, this._vista, this._servicio);

        // Escuchamos la actualización cuando el controlador pequeño guarda en MockAPI
        this._vista.consolaData.addEventListener('actualizar', async () => {
            await this.refrescarDatosDesdeNube();
        });

        this.mostrarEquiposEnPantalla();
    }

    private async refrescarDatosDesdeNube(): Promise<void> {
        this._vista.consolaData.textContent = "Sincronizando cambios con MockAPI...";
        const equiposActualizados = await this._servicio.getEquipos();
        this._modelo.equipos = equiposActualizados;
        this.mostrarEquiposEnPantalla();
    }

    /**
     * 📊 MUESTRA EL JSON CRUDO DIRECTO EN LA PANTALLA
     */
    public mostrarEquiposEnPantalla(): void {
        const contenedor = this._vista.consolaData;
        
        // Convertimos el arreglo de objetos a formato JSON legible (con espaciado de 2)
        const registrosFormateados = this._modelo.equipos.map(eq => eq.toJSON());
        
        // Lo imprimimos directo en el <pre> del HTML
        contenedor.textContent = JSON.stringify(registrosFormateados, null, 2);
    }
}