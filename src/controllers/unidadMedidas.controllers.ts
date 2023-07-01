import { Request, Response } from "express";
import UnidadMedidasService from "../services/unidadMedidas.services";



const obtenerUnidadMedidas  = async ( req : Request , res : Response  ) => {
    
    try {
        let unidadMedidasService = new UnidadMedidasService();
        let result = await unidadMedidasService.obtenerUnidadMedidas()
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



export {  obtenerUnidadMedidas };