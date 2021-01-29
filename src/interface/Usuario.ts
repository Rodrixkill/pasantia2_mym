export interface Usuario {
    ci: string;
    fnac: Date;
    primer_apellido: string;
    segundo_apellido: number;
    usuario: string;
    contrasena: string;
    tipo: string;
    empresa: number;
    permisos: "ADMIN_MM"|"GRAL";
}