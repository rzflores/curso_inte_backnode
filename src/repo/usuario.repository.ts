import { AgregarUsuarioDTO } from "../DTO/AgregarUsuarioDTO";
import { CamEstUsuarioDTO } from "../DTO/CamEstUsuarioDTO";
import { UsuarioDTO } from "../DTO/UsuarioDTO";
import { UsuarioInterface } from "../types/user.type";

export interface UsuarioRepository{
    obtenerUsuario(IdUsuario:number) : Promise<UsuarioInterface>
    obtenerUsuarios() : Promise<UsuarioInterface[]>
    registrarUsuario(agregarUsuarioDTO : AgregarUsuarioDTO) : Promise<boolean>
    editarUsuario(usuarioDTO : UsuarioDTO) : Promise<boolean>
}