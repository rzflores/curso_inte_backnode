import { Request, Response } from "express";
import UsuarioService from "../services/usuario.services";
import { AgregarUsuarioDTO } from "../DTO/AgregarUsuarioDTO";
import { UsuarioDTO } from "../DTO/UsuarioDTO";

const obtenerUsuario  = async ( req : Request , res : Response  ) => {
    try {
        let { IdUsuario } = req.body
        let usuarioService = new UsuarioService();
        let result = await usuarioService.obtenerUsuario(IdUsuario)
        
        res.status(200).send(
              {
                  ok : true,  
                  data : result
              }  
            );
    } catch (error) {
        res.status(404).send(
            { 
                ok : false,
                mensaje : error.message
            }
        )
    }
} 

const obtenerUsuarios  = async ( req : Request , res : Response  ) => {
    
    try {
        let usuarioService = new UsuarioService();
        let result = await usuarioService.obtenerUsuarios()
        res.status(200).send(
              {
                  ok : true,  
                  data : result
              }  
            );
    } catch (error) {
        res.status(404).send(
            { 
                ok : false,
                mensaje : error.message
            }
        )
    }
} 

const registrarUsuario  = async ( req : Request , res : Response  ) => {
    
    try {
        let { 
            Nombres , 
            Apellidos , 
            Celular , 
            NombreUsuario ,
            Contrasena,
            EsHabilitado,
            IdRol,
            IdSucursal
        }  = req.body

        let newUsuarioDTO : AgregarUsuarioDTO = {
            Nombres,
            Apellidos,
            Celular,
            NombreUsuario,
            Contrasena,
            EsHabilitado,
            IdRol,
            IdSucursal
        }
        let usuarioService = new UsuarioService();
        let result = await usuarioService.registrarUsuario(newUsuarioDTO);
        res.status(200).send(
              {
                  ok : true,  
                  data : result
              }  
            );
    } catch (error) {
        res.status(404).send(
            { 
                ok : false,
                mensaje : error.message
            }
        )
    }
} 

const editarUsuario = async ( req : Request , res : Response  ) => {
    
    try {
        let { 
            IdUsuario,
            Nombres , 
            Apellidos , 
            Celular , 
            NombreUsuario ,
            Contrasena,
            EsHabilitado,
            IdRol,
            IdSucursal
        }  = req.body

        let usuarioDTO : UsuarioDTO = {
            IdUsuario,
            Nombres,
            Apellidos,
            Celular,
            NombreUsuario,
            Contrasena,
            EsHabilitado,
            IdRol,
            IdSucursal
        }

        let usuarioService = new UsuarioService();
        let result = await usuarioService.editarUsuario(usuarioDTO);
        res.status(200).send(
              {
                  ok : true,  
                  data : result
              }  
            );
    } catch (error) {
        res.status(404).send(
            { 
                ok : false,
                mensaje : error.message
            }
        )
    }
}


export { obtenerUsuario , obtenerUsuarios , registrarUsuario , editarUsuario };