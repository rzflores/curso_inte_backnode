import { Request, Response } from "express";
import AuthService from "../services/auth.services";
import { LoginDTO } from '../DTO/LoginDTO';

const login  = async ( req : Request , res : Response  ) => {
    try {
         let { NombreUsuario , Contrasenia  , IdSucursal}  = req.body

         if( NombreUsuario== "" || Contrasenia == "" || IdSucursal == null ){
          return res.status(404).send(
               { 
               ok : false,
               mensaje : "Campos Obligatorios no Proporcionados"
               }
          )
         }
         let authService = new AuthService();
         let loginDTO : LoginDTO = { NombreUsuario, Contrasenia , IdSucursal }
         let result = await authService.login(loginDTO);
         return res.send({
              ok : true,
              data  : result
         });
    } catch (error) {
          return res.status(404).send(
               { 
               ok : false,
               mensaje : error.message
               }
          )
    }
} 

const renovarToken  = async ( req : Request , res : Response  ) => {
     try {
     let { NombreUsuario , Contrasenia , IdSucursal }  = req.body
     let authService = new AuthService();
     let loginDTO : LoginDTO = { NombreUsuario, Contrasenia , IdSucursal }
     let result  = await authService.renovarToken(loginDTO);
     res.send(result);
     } catch (error) {
          res.status(404).send(
               { 
               ok : false,
               mensaje : error.message
               }
          )
     }
} 


export { login , renovarToken };