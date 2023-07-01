import { Repository } from "typeorm";
import { dbConect } from "../configDb/FileConfigDb";
import { Roles } from "../entity/Roles";
import { RolInterface } from "../types/rol.type";
import { RolRepository } from "../repo/rol.repository";

export default class RolService implements RolRepository {

    private readonly rolService: Repository<Roles> = dbConect.getRepository(Roles); 

    constructor(){

    }
    async obtenerRoles(): Promise<RolInterface[]> {
        try {
            let result = await  this.rolService.find()
            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }
            return  new Promise<RolInterface[]>((resolve ,reject ) => {
                  resolve(result)
             })               
        } catch (error) {
             return Promise.reject(new Error("Error | CategoriaService"));
        }
    }
  
}