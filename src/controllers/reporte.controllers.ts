import { Request, Response } from "express";
import ProductoService from "../services/producto.services";
import { FiltrosStockDTO } from "../DTO/FiltrosStockDTO";
import { FiltrosVencimientoDTO } from "../DTO/FiltrosVencimientoDTO";



const obtenerReporteStock  = async ( req : Request , res : Response  ) => {
    
    try {
        let { 
            Nombre ,
            Descripcion ,
            IdCategoria 
        }  = req.body
        let productoService = new   ProductoService();
        let filtrosStock : FiltrosStockDTO = {
            Nombre,
            Descripcion,
            IdCategoria
        }
        let result = await productoService.obtenerReporteStock(filtrosStock)
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
const obtenerReporteVencimiento  = async ( req : Request , res : Response  ) => {
    
    try {
        let { 
            Nombre ,
            Descripcion ,
            IdCategoria ,
            FechaInicio,
            FechaFin
            
        }  = req.body
        let productoService = new   ProductoService();
        let filtrosVencimiento : FiltrosVencimientoDTO = {
            Nombre,
            Descripcion,
            IdCategoria,
            FechaInicio,
            FechaFin
        }
        let result = await productoService.obtenerReporteVencimiento(filtrosVencimiento)
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



export {  obtenerReporteStock , obtenerReporteVencimiento };