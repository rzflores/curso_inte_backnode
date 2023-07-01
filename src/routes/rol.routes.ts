import { Router } from "express";
import { obtenerRoles  } from '../controllers/rol.controllers'
import { checkToken } from '../middlewares/checkToken'
const route = Router();

route.post('/rol/obtenerRoles' , [checkToken] , obtenerRoles )


export default route;