import { Router } from "express";
import { obtenerMenusRol , cambiarEstadoMenus } from '../controllers/menu.controllers'
import { checkToken } from '../middlewares/checkToken'
const route = Router();

route.post('/menu/obtenerMenusRol' , [checkToken] , obtenerMenusRol )
route.post('/menu/cambiarEstadoMenus' , [checkToken] , cambiarEstadoMenus )


export default route;