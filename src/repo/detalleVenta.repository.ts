import { RegistrarVentaDTO } from "../DTO/RegistrarVentaDTO";

export interface DetalleVentaRepository {
    registrarVenta( registrarVenta : RegistrarVentaDTO) : Promise<boolean>
}