import { Router } from "express";
import { obtenerCategorias } from '../controllers/categoria.controller'
import { checkToken } from '../middlewares/checkToken'
const route = Router();

route.post('/categoria/obtenerCategorias' , [checkToken] , obtenerCategorias )

export default route;