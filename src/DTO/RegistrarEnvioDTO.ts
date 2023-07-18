import { DetalleEnvioDTO } from '../DTO/DetalleEnvioDTO'
import { GuiaRemisionDTO } from './GuiaRemisionDTO'

export interface RegistrarEnvioDTO{
    FechaSalida : string,
    FechaLlegada : string,
    NombreConductor : string,
    CelularConductor : string,
    PlacaVehiculo : string,
    IdUsuario : number,
    IdSucursalOrigen : number,
    IdSucursalDestino : number
    ListaDetalleEnvio : DetalleEnvioDTO[]
}