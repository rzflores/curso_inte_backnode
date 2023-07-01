import { Request, Response } from "express";
import AuthService from "../services/auth.services";
import { LoginDTO } from '../DTO/LoginDTO';

const login  = async ( req : Request , res : Response  ) => {
    try {
         let { NombreUsuario , Contrasenia }  = req.body
         let authService = new AuthService();
         let loginDTO : LoginDTO = { NombreUsuario, Contrasenia }
         let result = await authService.login(loginDTO);
         res.send({
              ok : true,
              data  : result
         });
    } catch (error) {
          res.status(404).send(
               { 
               ok : false,
               mensaje : error.message
               }
          )
    }
} 

const renovarToken  = async ( req : Request , res : Response  ) => {
     try {
     let { NombreUsuario , Contrasenia }  = req.body
     let authService = new AuthService();
     let loginDTO : LoginDTO = { NombreUsuario, Contrasenia }
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