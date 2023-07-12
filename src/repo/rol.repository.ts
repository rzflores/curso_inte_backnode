import { Roles } from "../entity/Roles";
import { RolInterface } from "../types/rol.type";

export interface RolRepository{
    obtenerRoles() : Promise<RolInterface[]>
    obtenerRolModel(IdRol : number) :Promise<Roles>
}