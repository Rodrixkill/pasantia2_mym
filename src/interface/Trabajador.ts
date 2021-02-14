import { StringLiteralLike } from "typescript";

export interface Trabajador {
    ci: string;
    expedido: string;
    codigo: number;
    sexo: string;
    empresa: number;
    telefono: string;
    fecha_nacimiento: Date;
    edad: number;
    nombre: string;
    correo_electronico: string;
    usuario: string;
    contrasena: string;
    fecha_ingreso: Date;
    antiguedad: number;
    activo: number;
}