import { Router } from "express";
import { obtenerSucursal , obtenerSucursales , registrarSucursal , editarSurcursal } from '../controllers/sucursal.controllers'
import { checkToken } from '../middlewares/checkToken'
const route = Router();

route.post('/sucursal/obtenerSucursal' , [checkToken] , obtenerSucursal )
route.post('/sucursal/obtenerSucursales' , [checkToken] , obtenerSucursales )
route.post('/sucursal/registrarSucursal' , [checkToken] , registrarSucursal )
route.post('/sucursal/editarSurcursal' , [checkToken] , editarSurcursal )



export default route;