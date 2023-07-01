import { Request, Response } from "express";
import SucursalService from "../services/surcursal.services";
import { AgregarSucursalDTO } from "../DTO/AgregarSucursalDTO";
import { SucursalDTO } from "../DTO/SurcursalDTO";

const obtenerSucursal  = async ( req : Request , res : Response  ) => {
    try {
        let { idSucursal } = req.body
        let sucursalService = new SucursalService();
        let result = await sucursalService.obtenerSucursal(idSucursal)

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

const obtenerSucursales  = async ( req : Request , res : Response  ) => {
    
    try {
        let sucursalService = new SucursalService();
        let result = await sucursalService.obtenerSucursales()
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

const registrarSucursal  = async ( req : Request , res : Response  ) => {
    
    try {
        let { Nombre , CelularSucursal , Direccion , Referencia }  = req.body

        let newSucursalDTO : AgregarSucursalDTO = {
            Nombre,
            CelularSucursal,
            Direccion,
            Referencia
        }
        let sucursalService = new SucursalService();
        let result = await sucursalService.registrarSurcursal(newSucursalDTO);
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

const editarSurcursal = async ( req : Request , res : Response  ) => {
    
    try {
        let { IdSucursal , Nombre , CelularSucursal , Direccion , Referencia }  = req.body

        let sucursalDTO : SucursalDTO = {
            IdSucursal,
            Nombre,
            CelularSucursal,
            Direccion,
            Referencia
        }

        let sucursalService = new SucursalService();
        let result = await sucursalService.editarSurcursal(sucursalDTO);
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


export { obtenerSucursal , obtenerSucursales , registrarSucursal , editarSurcursal };