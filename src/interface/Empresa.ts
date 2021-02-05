export interface Empresa {
    id?: number;
    razon_social: string;
    sigla: string;
    nit: number;
    direccion: string;
    ciudad: string;
    telefono: string;
    representante_legal: string;
    ci_representante_legal: string;
    activo: number;
    fecha_alta: Date;
}