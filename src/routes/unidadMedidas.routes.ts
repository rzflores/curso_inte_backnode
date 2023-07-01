import { Router } from "express";
import { obtenerUnidadMedidas  } from '../controllers/unidadMedidas.controllers'
import { checkToken } from '../middlewares/checkToken'
const route = Router();

route.post('/unidadMedidas/obtenerUnidadMedidas' , [checkToken] , obtenerUnidadMedidas )


export default route;