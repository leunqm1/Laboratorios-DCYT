export default class Cl_mEquipos {
    _marca;
    _procesador;
    _memoria;
    _ubicacion;
    _estado;
    _id;
    constructor(marca, procesador, memoria, ubicacion, estado, id) {
        this._marca = marca;
        this._procesador = procesador;
        this._memoria = memoria;
        this._ubicacion = ubicacion;
        this._estado = estado;
        this._id = id || undefined;
    }
    set id(id) {
        this._id = id;
    }
    set marca(marca) {
        this._marca = marca;
    }
    set procesador(procesador) {
        this._procesador = procesador;
    }
    set memoria(memoria) {
        this._memoria = memoria;
    }
    set ubicacion(ubicacion) {
        this._ubicacion = ubicacion;
    }
    set estado(estado) {
        this._estado = estado;
    }
    get id() {
        return this._id;
    }
    get marca() {
        return this._marca;
    }
    get procesador() {
        return this._procesador;
    }
    get memoria() {
        return this._memoria;
    }
    get ubicacion() {
        return this._ubicacion;
    }
    get estado() {
        return this._estado;
    }
    Mantenimiento() {
        if (this._estado === 'Mantenimiento') {
            return true;
        }
        return false;
    }
    Reportado() {
        if (this._estado === 'reportado') {
            return true;
        }
        return false;
    }
    Activo() {
        if (this._estado === 'activo') {
            return true;
        }
        return false;
    }
    toJSON() {
        return {
            id: this.id,
            marca: this._marca,
            procesador: this._procesador,
            memoria: this._memoria,
            ubicacion: this._ubicacion,
            estado: this._estado
        };
    }
}
//# sourceMappingURL=Cl_mEquipos.js.map