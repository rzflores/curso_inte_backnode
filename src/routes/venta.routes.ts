import { Router } from "express";
import { realizarVenta } from "../controllers/venta.controllers";
import { checkToken } from "../middlewares/checkToken";


const route = Router();

route.post('/venta/realizarVenta' , [checkToken] , realizarVenta )


export default route;