import { Router } from "express";
import { obtenerCupon, obtenerCupones , registrarCupon, editarCupon , verificarCupon } from '../controllers/cupon.controllers'
import { checkToken } from '../middlewares/checkToken'
const route = Router();

route.post('/cupon/obtenerCupon' , [checkToken] , obtenerCupon )
route.post('/cupon/obtenerCupones' , [checkToken] , obtenerCupones )
route.post('/cupon/registrarCupon' , [checkToken] , registrarCupon )
route.post('/cupon/editarCupon' , [checkToken] , editarCupon )
route.post('/cupon/verificarCupon' , [checkToken] , verificarCupon )


export default route;