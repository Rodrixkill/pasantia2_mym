export interface Usuario {
    ci: string;
    fecha_nacimiento: Date;
    nombre: string;
    primer_apellido: string;
    segundo_apellido: number;
    correo_electronico: string;
    usuario: string;
    contrasena: string;
    tipo: string;
    empresa: number;
    permisos: "ADMIN_MM"|"GRAL";
    activo: number;
}