import { AgregarSucursalDTO } from "../DTO/AgregarSucursalDTO";
import { SucursalDTO } from "../DTO/SurcursalDTO";
import { SucursalInterface } from "../types/surcursal.type";

export interface SucursalRepository
{
    obtenerSucursal(IdSucursal:number) : Promise<SucursalInterface>
    obtenerSucursales() : Promise<SucursalInterface[]>
    registrarSurcursal(agregarSucursalDTO : AgregarSucursalDTO) : Promise<boolean>
    editarSurcursal(sucursalDTO : SucursalDTO) : Promise<boolean>
}    