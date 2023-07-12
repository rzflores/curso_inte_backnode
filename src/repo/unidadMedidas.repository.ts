import { UnidadMedidasInterface } from "../types/unidadMedidas.type";

export interface UnidadMedidasRepository{
    obtenerUnidadesMedidas() : Promise<UnidadMedidasInterface[]>
}