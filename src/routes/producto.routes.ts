import { Router } from "express";
import { obtenerProducto , obtenerProductos , registrarProducto , editarProducto } from '../controllers/producto.controllers'
import { checkToken } from '../middlewares/checkToken'
const route = Router();

route.post('/producto/obtenerProducto' , [checkToken] , obtenerProducto )
route.post('/producto/obtenerProductos' , [checkToken] , obtenerProductos )
route.post('/producto/registrarProducto' , [checkToken] , registrarProducto )
route.post('/producto/editarProducto' , [checkToken] , editarProducto )



export default route;