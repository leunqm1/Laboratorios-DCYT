export default class Cl_mEquipos {
    private _marca;
    private _procesador;
    private _memoria;
    private _ubicacion;
    private _estado;
    private _id?;
    constructor(marca: string, procesador: string, memoria: number, ubicacion: string, estado: 'activo' | 'reportado' | 'Mantenimiento', id?: string);
    set id(id: string);
    set marca(marca: string);
    set procesador(procesador: string);
    set memoria(memoria: number);
    set ubicacion(ubicacion: string);
    set estado(estado: 'activo' | 'reportado' | 'Mantenimiento');
    get id(): string | undefined;
    get marca(): string;
    get procesador(): string;
    get memoria(): number;
    get ubicacion(): string;
    get estado(): 'activo' | 'reportado' | 'Mantenimiento';
    Mantenimiento(): boolean;
    Reportado(): boolean;
    Activo(): boolean;
    toJSON(): {
        id: string | undefined;
        marca: string;
        procesador: string;
        memoria: number;
        ubicacion: string;
        estado: "activo" | "reportado" | "Mantenimiento";
    };
}
//# sourceMappingURL=Cl_mEquipos.d.ts.map