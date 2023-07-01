import { Request, Response } from "express";
import RolService from "../services/rol.services";



const obtenerRoles  = async ( req : Request , res : Response  ) => {
    
    try {
        let rolService = new   RolService();
        let result = await rolService.obtenerRoles()
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



export {  obtenerRoles };