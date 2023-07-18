import { Request, Response } from "express";
import VentaService from "../services/venta.services";
import { RegistrarVentaDTO } from "../DTO/RegistrarVentaDTO";

const realizarVenta  = async ( req : Request , res : Response  ) => {
    try {
         let { 
            TotalVenta ,
            FechaVenta ,
            IdCupon ,
            ListaDetalleVenta 
        }  = req.body

         let ventaService = new VentaService();
         let registrarVentaDTO : RegistrarVentaDTO = { 
            TotalVenta, 
            FechaVenta , 
            IdCupon,
            ListaDetalleVenta
        }
         let result = await ventaService.registrarVenta(registrarVentaDTO);
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