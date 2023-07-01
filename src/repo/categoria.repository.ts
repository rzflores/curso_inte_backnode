import { CategoriaInterface } from "../types/categoria.type";

export interface CategoriaRepository{
    obtenerCategorias() : Promise<CategoriaInterface[]>
}