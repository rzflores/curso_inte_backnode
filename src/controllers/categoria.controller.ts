import { Request, Response } from "express";
import CategoriaService from "../services/categorias.services";



const obtenerCategorias  = async ( req : Request , res : Response  ) => {
    
    try {
        let categoriasService = new CategoriaService();
        let result = await categoriasService.obtenerCategorias()
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



export {  obtenerCategorias };