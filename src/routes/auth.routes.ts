import { Router } from "express";
import { login, renovarToken } from "../controllers/auth.controllers";


const route = Router();

route.get('/auth/login'  , login )

route.post('/auth/renovar' , renovarToken )


export default route;