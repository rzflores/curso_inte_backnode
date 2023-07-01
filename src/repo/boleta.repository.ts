import { ImprimirBoletaDTO } from "../DTO/ImprimirBoletaDTO";

export interface BoletaRepository{
    imprimirBoleta(idBoleta : number) : Promise<ImprimirBoletaDTO[]>
}