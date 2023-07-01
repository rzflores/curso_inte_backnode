import { ImprimirGuiaRemisionDTO } from "../DTO/ImprimirGuiaRemisionDTO";

export interface GuiaRemisionRepository{
    imprimirGuia(idGuiaRemision : number) : Promise<ImprimirGuiaRemisionDTO[]>
}