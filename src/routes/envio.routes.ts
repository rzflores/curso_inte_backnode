import { Router } from "express";
import { realizarEnvio } from "../controllers/envio.controllers";
import { checkToken } from "../middlewares/checkToken";


const route = Router();

route.post('/envio/realizarEnvio' , [checkToken]  , realizarEnvio )


export default route;