import Cl_mLaboratorio from "../models/Cl_mLaboratorio.js";
import Cl_vEquipo from "../views/Cl_vEquipo.js";
import Cl_sEquipo from "../services/Cl_sEquipo.js";
import Cl_mEquipos from "../models/Cl_mEquipos.js";

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
            this.procesarAccion('Activo'); 
        });
        this._vistaEquipo.onAgregarEquipo(async (datosNuevos) => {
            try {
                console.log("🚀 Subiendo nuevo equipo a MockAPI...", datosNuevos);
                
                const nuevoObjetoEquipo = new Cl_mEquipos(
                    datosNuevos.marca,
                    datosNuevos.procesador,
                    datosNuevos.memoria,
                    datosNuevos.ubicacion,
                    datosNuevos.meson,
                    datosNuevos.puesto,
                    datosNuevos.estado,
                    datosNuevos.observacion
                );

                await this._servicio.agregarEquipo(nuevoObjetoEquipo)
                this._vistaEquipo.tablaEquipo.dispatchEvent(new CustomEvent('actualizar'));
                
            } catch (error) {
                console.error(error);
                alert("No se pudo guardar el equipo en el servidor remoto.");
            }
        });
    }

    private async procesarAccion(nuevoEstado: 'Activo' | 'Mantenimiento'): Promise<void> {
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
                console.log("✅ Estado actualizado en MockAPI con éxito.");
                this._vistaEquipo.tablaEquipo.dispatchEvent(new CustomEvent('actualizar'));
            } else {
                alert("Error de conexión al guardar los cambios en MockAPI.");
            }
        } else {
            alert(`El equipo con ID ${id} no existe en el sistema.`);
        }
    }
}