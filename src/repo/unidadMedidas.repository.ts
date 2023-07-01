import { UnidadMedidasInterface } from "../types/unidadMedidas.type";

export interface UnidadMedidasRepository{
    obtenerUnidadMedidas() : Promise<UnidadMedidasInterface[]>
}