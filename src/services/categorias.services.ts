import { Repository } from "typeorm";
import { dbConect } from "../configDb/FileConfigDb";
import { CategoriaRepository } from "../repo/categoria.repository";
import { CategoriaInterface } from "../types/categoria.type";
import { Categorias } from "../entity/Categorias";

export default class CategoriaService implements CategoriaRepository {

    private readonly categoriaService: Repository<Categorias> = dbConect.getRepository(Categorias); 

    constructor(){

    }
    async obtenerCategorias(): Promise<CategoriaInterface[]> {
        try {
            let result = await  this.categoriaService.find()
            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }
            return  new Promise<CategoriaInterface[]>((resolve ,reject ) => {
                  resolve(result)
             })               
        } catch (error) {
             return Promise.reject(new Error("Error | CategoriaService"));
        }
    }
    async obtenerCategoria(IdCategoria : number): Promise<Categorias> {
        try {
            let result = await  this.categoriaService.findOne({ where : { IdCategoria : IdCategoria }})
            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }
            return  new Promise<Categorias>((resolve ,reject ) => {
                  resolve(result)
             })               
        } catch (error) {
             return Promise.reject(new Error("Error | CategoriaService"));
        }
    }
   
}