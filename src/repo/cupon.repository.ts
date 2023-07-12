import { AgregarCuponDTO } from "../DTO/AgregarCuponDTO";
import { CuponDTO } from "../DTO/CuponDTO";
import { CuponInterface } from "../types/cupon.type";

export interface CuponRepository{
    obtenerCupon(IdCupon: number) : Promise<CuponInterface>
    obtenerCupones() : Promise<CuponInterface[]>
    registrarCupon(cupon : AgregarCuponDTO) : Promise<boolean>
    editarCupon(cupon : CuponDTO) : Promise<boolean>
}