import { Request, Response } from "express";
import MenuService from "../services/menu.services";
import { CamEstMenusDTO } from "../DTO/CamEstMenusDTO";

const obtenerMenusRol  = async ( req : Request , res : Response  ) => {
    
    try {
        let { IdRol } = req.body
        let menuService = new   MenuService();
        let result = await menuService.obtenerMenusRol(IdRol)
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

const cambiarEstadoMenus  = async ( req : Request , res : Response  ) => {
    
    try {
        let { IdRol , ListaMenus } = req.body

        let CamEstMenusDTO : CamEstMenusDTO = {
            IdRol ,
            ListaMenus 
        }

        let menuService = new   MenuService();
        let result = await menuService.cambiarEstadoMenus(CamEstMenusDTO)
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



export {  obtenerMenusRol , cambiarEstadoMenus };