import { CamEstCuponDTO } from "../DTO/CamEstCuponDTO";
import { CuponDTO } from "../DTO/CuponDTO";
import { CuponInterface } from "../types/cupon.type";

export interface CuponRepository{
    obtenerCupon() : Promise<CuponInterface>
    obtenerCupones() : Promise<CuponInterface[]>
    registrarCupon(cupon : CuponDTO) : Promise<boolean>
    editarCupon(cupon : CuponDTO) : Promise<boolean>
    cambiarEstadoCupon( camEstCupon : CamEstCuponDTO ) : Promise<boolean>

}