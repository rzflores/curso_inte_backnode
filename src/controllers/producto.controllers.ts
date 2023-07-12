import { Request, Response } from "express";
import ProductoService from "../services/producto.services";
import { AgregarProductoDTO } from "../DTO/AgregarProductoDTO";
import { ProductoDTO } from "../DTO/ProductoDTO";

const obtenerProducto  = async ( req : Request , res : Response  ) => {
    try {
        let { IdProducto } = req.body
        let productoService = new ProductoService();
        let result = await productoService.obtenerProducto(IdProducto)

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

const obtenerProductos  = async ( req : Request , res : Response  ) => {
    
    try {
        let { IdSucursal } = req.body
        let productoService = new ProductoService();
        let result = await productoService.obtenerProductos(IdSucursal)
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

const registrarProducto  = async ( req : Request , res : Response  ) => {
    
    try {
        let { 
            NombreProducto , 
            DescripcionCorta , 
            DescripcionLarga , 
            PrecioUnitario ,
            StockActual,
            UrlImagen,
            FechaVencimiento,
            IdCategoria,
            IdUnidadMedida,
            IdSucursal
        }  
        = req.body

        let newProductoDTO : AgregarProductoDTO = {
            NombreProducto,
            DescripcionCorta,
            DescripcionLarga,
            PrecioUnitario,
            StockActual,
            UrlImagen,
            FechaVencimiento,
            IdCategoria,
            IdUnidadMedida,
            IdSucursal
        }
        let productoService = new ProductoService();
        let result = await productoService.registrarProducto(newProductoDTO);
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

const editarProducto = async ( req : Request , res : Response  ) => {
    
    try {
        let { 
            IdProducto,
            NombreProducto , 
            DescripcionCorta , 
            DescripcionLarga , 
            PrecioUnitario ,
            StockActual,
            UrlImagen,
            FechaVencimiento,
            IdCategoria,
            IdUnidadMedida,
            IdSucursal
        }  
        = req.body

        let productoDTO : ProductoDTO = {
            IdProducto,
            NombreProducto,
            DescripcionCorta,
            DescripcionLarga,
            PrecioUnitario,
            StockActual,
            UrlImagen,
            FechaVencimiento,
            IdCategoria,
            IdUnidadMedida,
            IdSucursal
        }

        let productoService = new ProductoService();
        let result = await productoService.editarProducto(productoDTO);
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


export { obtenerProducto , obtenerProductos , registrarProducto , editarProducto };