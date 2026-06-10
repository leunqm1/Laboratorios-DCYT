export interface iEquipo{
    id?: string | undefined;
    marca: string;
    procesador: string;
    memoria: number;
    ubicacion: string;
    meson: string;
    puesto: string;
    estado: 'activo' | 'reportado' | 'Mantenimiento';
    observacion: string;
}