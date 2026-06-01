import Cl_mLaboratorio from "../models/Cl_mLaboratorio.js";
import Cl_vEquipo from "../views/Cl_vEquipo.js";
import Cl_sEquipo from "../services/Cl_sEquipo.js";

export default class Cl_cEquipo {
    private _modeloLaboratorio: Cl_mLaboratorio;
    private _vistaEquipo: Cl_vEquipo;
    private _servicio: Cl_sEquipo;

    constructor(modelo: Cl_mLaboratorio, vista: Cl_vEquipo, servicio: Cl_sEquipo) {
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
    private async procesarAccion(nuevoEstado: 'activo' | 'Mantenimiento'): Promise<void> {
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
            } else {
                alert("Error de conexión al guardar los cambios en MockAPI.");
            }
        } else {
            alert(`El equipo con ID ${id} no existe en el sistema.`);
        }
    }
}