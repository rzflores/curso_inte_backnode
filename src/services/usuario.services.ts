import { Repository } from "typeorm";
import { dbConect } from "../configDb/FileConfigDb";
import { Usuarios } from "../entity/Usuarios";
import { UsuarioRepository } from "../repo/usuario.repository";
import { AgregarUsuarioDTO } from "../DTO/AgregarUsuarioDTO";
import { UsuarioInterface } from "../types/user.type";
import { UsuarioDTO } from "../DTO/UsuarioDTO";
import { RolInterface } from "../types/rol.type";

export default class UsuarioService implements UsuarioRepository{

    private readonly usuarioService: Repository<Usuarios> = dbConect.getRepository(Usuarios); 

    constructor(){

    }
  
    async obtenerUsuario(IdUsuario: number): Promise<UsuarioInterface> {
        
        try {
            const result = await this.usuarioService
            .createQueryBuilder('usuarios')
            .leftJoinAndSelect('usuarios.RolesidRoles', 'roles')
            .where('usuarios.IdUsuario = :IdUsuario', { IdUsuario: IdUsuario })
            .getOne();


            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }

            let itemRol : RolInterface = {
                IdRol : result.RolesidRoles.IdRol,
                Nombre : result.RolesidRoles.Nombre
            }
            
            let itemUsuario : UsuarioInterface = {
                IdUsuario : result.IdUsuario,
                Nombres : result.Nombres,
                Apellidos : result.Apellidos,
                Celular : result.Celular,
                NombreUsuario : result.NombreUsuario,
                Contrasena : result.Contrasena ,
                EsHabilitado : result.EsHabilitado ,
                Token : result.Token ,
                Rol : itemRol
                
            }                                 
            return  new Promise<UsuarioInterface>((resolve ,reject ) => {
                resolve(itemUsuario)
        })               
        } catch (error) {            
            return Promise.reject(new Error("Error | UsuarioService | obtenerUsuario"));
        }
    }
    async obtenerUsuarios(): Promise<UsuarioInterface[]> {
        try {
            let result = await  this.usuarioService.createQueryBuilder('usuarios')
            .leftJoinAndSelect('usuarios.RolesidRoles', 'roles')
            .getMany()

            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }

            let lstUsuario : UsuarioInterface[] = [];
            result.forEach((e) => {
                let itemRol : RolInterface = {
                    IdRol : e.RolesidRoles.IdRol,
                    Nombre : e.RolesidRoles.Nombre
                }
                let itemUsuario : UsuarioInterface = {
                    IdUsuario : e.IdUsuario,
                    Nombres : e.Nombres,
                    Apellidos : e.Apellidos,
                    Celular : e.Celular,
                    NombreUsuario : e.NombreUsuario,
                    Contrasena : e.Contrasena ,
                    EsHabilitado : e.EsHabilitado ,
                    Token : e.Token ,
                    Rol : itemRol    
                }
                lstUsuario.push(itemUsuario)
            })
           

            return  new Promise<UsuarioInterface[]>((resolve ,reject ) => {
                   resolve(lstUsuario)
             })               
        } catch (error) {
            console.log(error.message)
             return Promise.reject(new Error("Error | UsuarioService | obtenerUsuarios"));
        }
    }
    async registrarUsuario(agregarUsuarioDTO: AgregarUsuarioDTO): Promise<boolean> {
        try {
            let newUsuario = new Usuarios();
            newUsuario.Nombres = agregarUsuarioDTO.Nombres;
            newUsuario.Apellidos = agregarUsuarioDTO.Apellidos;
            newUsuario.Celular = agregarUsuarioDTO.Celular;
            newUsuario.NombreUsuario = agregarUsuarioDTO.NombreUsuario;
            newUsuario.Contrasena = agregarUsuarioDTO.Contrasena;
            newUsuario.EsHabilitado = agregarUsuarioDTO.EsHabilitado;
            newUsuario.Token = "";
            let result = await this.usuarioService.save(newUsuario)
            if(result == null) { return false }
            return true;
        } catch (error) {
            return Promise.reject(new Error("Error | SucursalService | registrarUsuario"));
        }
    }
    async editarUsuario(usuarioDTO: UsuarioDTO): Promise<boolean> {
        try {

            let editUsuario =   await this.usuarioService
                            .findOne({ 
                                    where : { 
                                        IdUsuario : usuarioDTO.IdUsuario,
                                    } 
                                    })

            if(editUsuario == null) { return Promise.reject(new Error("Usuario no existe")); }  
            editUsuario.Nombres = usuarioDTO.Nombres;
            editUsuario.Apellidos = usuarioDTO.Apellidos;
            editUsuario.Celular = usuarioDTO.Celular;
            editUsuario.NombreUsuario = usuarioDTO.NombreUsuario;
            editUsuario.Contrasena = usuarioDTO.Contrasena;
            editUsuario.EsHabilitado = usuarioDTO.EsHabilitado;
            let result = await this.usuarioService.save(editUsuario);
            if(result == null) { return false }
            return true;
        } catch (error) {
            console.log(error.message)
            return Promise.reject(new Error("Error | SucursalService | editarUsuario"));
        }
    }
    



}