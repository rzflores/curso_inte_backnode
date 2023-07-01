import { RolInterface } from "../types/rol.type";

export interface RolRepository{
    obtenerRoles() : Promise<RolInterface[]>
}