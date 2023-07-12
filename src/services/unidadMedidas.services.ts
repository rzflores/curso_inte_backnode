import { Repository } from "typeorm";
import { dbConect } from "../configDb/FileConfigDb";
import { UnidadMedidas } from "../entity/UnidadMedidas";
import { UnidadMedidasInterface } from "../types/unidadMedidas.type";
import { UnidadMedidasRepository } from "../repo/unidadMedidas.repository";

export default class UnidadMedidasService implements UnidadMedidasRepository {

    private readonly unidadMedidasService: Repository<UnidadMedidas> = dbConect.getRepository(UnidadMedidas); 

    constructor(){

    }
    async obtenerUnidadesMedidas(): Promise<UnidadMedidasInterface[]> {
        try {
            let result = await  this.unidadMedidasService.find()
            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }
            return  new Promise<UnidadMedidasInterface[]>((resolve ,reject ) => {
                  resolve(result)
             })               
        } catch (error) {
             return Promise.reject(new Error("Error | CategoriaService"));
        }
    }

    async obtenerUnidadMedida(IdUnidadMedida : number): Promise<UnidadMedidas> {
        try {
            let result = await  this.unidadMedidasService.findOne({ where : { IdUnidadMedida : IdUnidadMedida }})
            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }
            return  new Promise<UnidadMedidas>((resolve ,reject ) => {
                  resolve(result)
             })               
        } catch (error) {
             return Promise.reject(new Error("Error | CategoriaService"));
        }
    }
   
}