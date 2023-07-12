import { Request, Response } from "express";
import { RegistrarEnvioDTO } from '../DTO/RegistrarEnvioDTO';
import EnvioService from "../services/envio.services";

const realizarVenta  = async ( req : Request , res : Response  ) => {
    try {
         let { 
            FechaSalida ,
            FechaLlegada ,
            NombreConductor ,
            CelularConductor ,
            PlacaVehiculo ,
            IdUsuario ,
            IdSucursalOrigen ,
            IdSucursalDestino ,
            ListaDetalleEnvio ,
            GuiaRemision 
        }  = req.body

         let envioService = new EnvioService();
         let registrarEnvioDTO : RegistrarEnvioDTO = { 
            FechaSalida, 
            FechaLlegada , 
            NombreConductor,
            CelularConductor,
            PlacaVehiculo,
            IdUsuario,
            IdSucursalOrigen,
            IdSucursalDestino,
            ListaDetalleEnvio,
            GuiaRemision 
        }
         let result = await envioService.registrarEnvio(registrarEnvioDTO);
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


export { realizarVenta  };