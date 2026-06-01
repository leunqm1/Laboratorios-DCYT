export default class Cl_mEquipos {
    private _marca: string;
    private _procesador: string;
    private _memoria: number;
    private _ubicacion: string;
    private _estado: 'activo' | 'reportado' | 'Mantenimiento';
    private _id?: string | undefined;

    constructor(marca: string, procesador: string, memoria: number, ubicacion: string, estado: 'activo' | 'reportado' | 'Mantenimiento', id?: string) {
        this._marca = marca;
        this._procesador = procesador;
        this._memoria = memoria;
        this._ubicacion = ubicacion;
        this._estado = estado;
        this._id = id || undefined; 
    }

    public set id(id: string) {
        this._id = id;
    }


    public set marca(marca: string) {
        this._marca = marca;
    }

    public set procesador(procesador: string) {
        this._procesador = procesador;
    }

    public set memoria(memoria: number) {
        this._memoria = memoria;
    }


    public set ubicacion(ubicacion: string) {
        this._ubicacion = ubicacion;
    }

    public set estado(estado: 'activo' | 'reportado' | 'Mantenimiento') {
        this._estado = estado;
    }

    public get id(): string | undefined {
        return this._id;
    }

    public get marca(): string {
        return this._marca;
    }
    public get procesador(): string {
        return this._procesador;
    }
    public get memoria(): number {
        return this._memoria;
    }
    public get ubicacion(): string {
        return this._ubicacion;
    }
    public get estado(): 'activo' | 'reportado' | 'Mantenimiento' {
        return this._estado;
    }

    public Mantenimiento() {
        if (this._estado === 'Mantenimiento') {
            return true;
        }
        return false;
    }

    public Reportado() {
        if (this._estado === 'reportado') {
            return true;
        }
        return false;
    }

    public Activo() {
        if (this._estado === 'activo') {
            return true;
        }
        return false;
    }

    public toJSON() {
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