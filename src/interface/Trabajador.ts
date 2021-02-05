import { StringLiteralLike } from "typescript";

export interface Trabajador {
    ci: string;
    codigo: number;
    sexo: string;
    empresa: number;
    cargo: string;
    telefono: string;
    direccion: string;
    fecha_nacimiento: Date;
    edad: number;
    nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    correo_electronico: string;
    usuario: string;
    contrasena: string;
    fecha_ingreso: Date;
    antiguedad: number;
    activo: number;
    origen: string;
    estado_civil: string;
    profesion: string
}