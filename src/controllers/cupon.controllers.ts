import { Request, Response } from "express";
import CuponService from "../services/cupon.services";
import { AgregarCuponDTO } from "../DTO/AgregarCuponDTO";
import { CuponDTO } from "../DTO/CuponDTO";

const obtenerCupon  = async ( req : Request , res : Response  ) => {
    try {
        let { IdCupon } = req.body
        let cuponService = new CuponService();
        let result = await cuponService.obtenerCupon(IdCupon)

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

const obtenerCupones  = async ( req : Request , res : Response  ) => {
    
    try {
        let cuponService = new CuponService();
        let result = await cuponService.obtenerCupones()
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

const registrarCupon  = async ( req : Request , res : Response  ) => {
    
    try {
        let { Codigo , PorcentajeDescuento , FechaVencimiento , EsHabilitado }  = req.body

        let newCuponDTO : AgregarCuponDTO = {
            Codigo,
            PorcentajeDescuento,
            FechaVencimiento,
            EsHabilitado
        }
        let cuponService = new CuponService();
        let result = await cuponService.registrarCupon(newCuponDTO);
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

const editarCupon = async ( req : Request , res : Response  ) => {
    
    try {
        let { IdCupon , Codigo , PorcentajeDescuento , FechaVencimiento , EsHabilitado }  = req.body

        let sucursalDTO : CuponDTO = {
            IdCupon,
            Codigo,
            PorcentajeDescuento,
            FechaVencimiento,
            EsHabilitado
        }

        let cuponService = new CuponService();
        let result = await cuponService.editarCupon(sucursalDTO);
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

const verificarCupon  = async ( req : Request , res : Response  ) => {
    try {
        let { CodigoCupon } = req.body
        let cuponService = new CuponService();
        let result = await cuponService.verificarCupon(CodigoCupon)

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




export { obtenerCupon , obtenerCupones , registrarCupon , editarCupon , verificarCupon };