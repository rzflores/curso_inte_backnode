import { Repository } from "typeorm";
import { dbConect } from "../configDb/FileConfigDb";
import { Usuarios } from "../entity/Usuarios";
import { UsuarioRepository } from "../repo/usuario.repository";
import { AgregarUsuarioDTO } from "../DTO/AgregarUsuarioDTO";
import { UsuarioInterface } from "../types/user.type";
import { UsuarioDTO } from "../DTO/UsuarioDTO";
import { RolInterface } from "../types/rol.type";
import RolService from "./rol.services";
import { SucursalUsuarioInterface } from "../types/surcursal.type";
import SucursalService from "./surcursal.services";
import { Roles } from "../entity/Roles";

export default class UsuarioService implements UsuarioRepository{

    private readonly usuarioService: Repository<Usuarios> = dbConect.getRepository(Usuarios); 

    constructor(){

    }
  
    async obtenerUsuario(IdUsuario: number): Promise<UsuarioInterface> {
        
        try {
            const result = await this.usuarioService
            .createQueryBuilder('usuarios')
            .leftJoinAndSelect('usuarios.RolesIdRoles', 'roles')
            .leftJoinAndSelect('usuarios.SurcursalIdSucursal', 'sucursales')
            .where('usuarios.IdUsuario = :IdUsuario', { IdUsuario: IdUsuario })
            .getOne();

            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }
            console.log(result)
            let itemRol : RolInterface = {
                IdRol : result.RolesIdRoles.IdRol,
                Nombre : result.RolesIdRoles.Nombre
            }
            let itemUsuarioSurcursal : SucursalUsuarioInterface = {
                IdSucursal : result.SurcursalIdSucursal.IdSucursal,
                Nombre : result.SurcursalIdSucursal.Nombre
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
                Rol : itemRol,
                Sucursal : itemUsuarioSurcursal
                
            }                                 
            return  new Promise<UsuarioInterface>((resolve ,reject ) => {
                resolve(itemUsuario)
        })               
        } catch (error) {     
            console.log(error)       
            return Promise.reject(new Error("Error | UsuarioService | obtenerUsuario"));
        }
    }

    async obtenerUsuarioModel(IdUsuario: number): Promise<Usuarios> {
        
        try {
            const result = await this.usuarioService
            .createQueryBuilder('usuarios')
            .leftJoinAndSelect('usuarios.RolesIdRoles', 'roles')
            .leftJoinAndSelect('usuarios.SurcursalIdSucursal', 'sucursales')
            .where('usuarios.IdUsuario = :IdUsuario', { IdUsuario: IdUsuario })
            .getOne();

            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }
                                
            return  new Promise<Usuarios>((resolve ,reject ) => {
                resolve(result)
        })               
        } catch (error) {     
            console.log(error)       
            return Promise.reject(new Error("Error | UsuarioService | obtenerUsuario"));
        }
    }

    async obtenerUsuarios(): Promise<UsuarioInterface[]> {
        try {
            let result = await  this.usuarioService.createQueryBuilder('usuarios')
            .leftJoinAndSelect('usuarios.RolesIdRoles', 'roles')
            .leftJoinAndSelect('usuarios.SurcursalIdSucursal', 'sucursales')
            .getMany()

            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }

            let lstUsuario : UsuarioInterface[] = [];
            result.forEach((e) => {
                let itemRol : RolInterface = {
                    IdRol : e.RolesIdRoles.IdRol,
                    Nombre : e.RolesIdRoles.Nombre
                }
                let itemUsuarioSurcursal : SucursalUsuarioInterface = {
                    IdSucursal : e.SurcursalIdSucursal.IdSucursal,
                    Nombre : e.SurcursalIdSucursal.Nombre
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
                    Rol : itemRol ,
                    Sucursal : itemUsuarioSurcursal   
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

            let rolService = new RolService();
            let resultRol  = await rolService.obtenerRolModel(agregarUsuarioDTO.IdRol) 
            newUsuario.RolesIdRoles = resultRol

            let sucursalService = new SucursalService();
            let resultSucursal  = await sucursalService.obtenerSucursalModel(agregarUsuarioDTO.IdSucursal) 
            newUsuario.SurcursalIdSucursal = resultSucursal

            let result = await this.usuarioService.save(newUsuario)
            if(result == null) { return false }
            return true;
        } catch (error) {
            return Promise.reject(new Error("Error | SucursalService | registrarUsuario"));
        }
    }
    async editarUsuario(usuarioDTO: UsuarioDTO): Promise<boolean> {
        try {

            
            const editUsuario = await this.usuarioService
                                    .createQueryBuilder('usuarios')
                                    .leftJoinAndSelect('usuarios.RolesIdRoles', 'roles')
                                    .where('usuarios.IdUsuario = :IdUsuario', { IdUsuario: usuarioDTO.IdUsuario })
                                    .getOne();                        


            if(editUsuario == null) { return Promise.reject(new Error("Usuario no existe")); }  
            
            editUsuario.Nombres = usuarioDTO.Nombres;
            editUsuario.Apellidos = usuarioDTO.Apellidos;
            editUsuario.Celular = usuarioDTO.Celular;
            editUsuario.NombreUsuario = usuarioDTO.NombreUsuario;
            editUsuario.Contrasena = usuarioDTO.Contrasena;
            editUsuario.EsHabilitado = usuarioDTO.EsHabilitado;

            if(usuarioDTO.IdRol != 0){
                let rolService = new RolService();
                let resultRol  = await rolService.obtenerRolModel(usuarioDTO.IdRol) 
                editUsuario.RolesIdRoles = resultRol
            }
            if(usuarioDTO.IdSucursal != 0){
                let sucursalService = new SucursalService();
                let resultSucursal  = await sucursalService.obtenerSucursalModel(usuarioDTO.IdSucursal)                
                editUsuario.SurcursalIdSucursal = resultSucursal
            }

            let result = await this.usuarioService.save(editUsuario);
            if(result == null) { return false }
            return true;
        } catch (error) {
            return Promise.reject(new Error("Error | SucursalService | editarUsuario"));
        }
    }
    



}