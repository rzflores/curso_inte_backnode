import { Router } from "express";
import { obtenerUsuario , obtenerUsuarios , registrarUsuario , editarUsuario } from '../controllers/usuario.controllers'
import { checkToken } from '../middlewares/checkToken'
const route = Router();

route.post('/usuario/obtenerUsuario' , [checkToken] , obtenerUsuario )
route.post('/usuario/obtenerUsuarios' , [checkToken] , obtenerUsuarios )
route.post('/usuario/registrarUsuario' , [checkToken] , registrarUsuario )
route.post('/usuario/editarUsuario' , [checkToken] , editarUsuario )



export default route;