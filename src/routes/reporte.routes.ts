import { Router } from "express";
import { obtenerReporteStock , obtenerReporteVencimiento } from '../controllers/reporte.controllers'
import { checkToken } from '../middlewares/checkToken'
const route = Router();

route.post('/reporte/obtenerReporteStock' , [checkToken] , obtenerReporteStock )
route.post('/reporte/obtenerReporteVencimiento' , [checkToken] , obtenerReporteVencimiento )

export default route;