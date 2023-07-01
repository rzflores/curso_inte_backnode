import { RolInterface } from "./rol.type";

export interface UsuarioInterface {
    IdUsuario: number,
    Nombres: string,
    Apellidos: string,
    Celular: string,
    NombreUsuario: string,
    Contrasena: string,
    EsHabilitado: boolean,
    Token: string,
    Rol : RolInterface
}