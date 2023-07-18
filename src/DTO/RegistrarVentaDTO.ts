import { BoletaDTO } from "./BoletaDTO"
import { DetalleVentaDTO } from "./DetalleVentaDTO"

export interface RegistrarVentaDTO{
    TotalVenta : number,
    FechaVenta : string,
    IdCupon? : number,
    ListaDetalleVenta : DetalleVentaDTO[]
}