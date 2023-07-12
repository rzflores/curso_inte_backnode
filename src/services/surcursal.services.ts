import { Repository } from "typeorm";
import { SucursalDTO } from "../DTO/SurcursalDTO";
import { Sucursales } from "../entity/Sucursales";
import { SucursalRepository } from "../repo/surcursal.repository";
import { SucursalInterface } from "../types/surcursal.type";
import { dbConect } from "../configDb/FileConfigDb";
import { AgregarSucursalDTO } from "../DTO/AgregarSucursalDTO";

export default class SucursalService implements SucursalRepository {

    private readonly sucursalService: Repository<Sucursales> = dbConect.getRepository(Sucursales); 

    constructor(){

    }
   
    async obtenerSucursal(IdSucursal : number): Promise<SucursalInterface> {
        
        try {
            
            let result = await  this.sucursalService.findOne(
                                                            { 
                                                            where : {
                                                                IdSucursal : IdSucursal 
                                                                    }
                                                            }
                                                            );
            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }
            let itemSucursal : SucursalInterface = {
                IdSucursal : result.IdSucursal,
                Nombre : result.Nombre,
                CelularSucursal : result.CelularSucursal,
                Direccion : result.Direccion,
                Referencia : result.Referencia    
            }                                 
            return  new Promise<SucursalInterface>((resolve ,reject ) => {
                resolve(itemSucursal)
        })               
        } catch (error) {
            return Promise.reject(new Error("Error | SucursalService | obtenerSucursal"));
        }
    }
    async obtenerSucursales(): Promise<SucursalInterface[]> {
       
        try {
            let result = await  this.sucursalService.find()
            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }
            return  new Promise<SucursalInterface[]>((resolve ,reject ) => {
                  resolve(result)
             })               
        } catch (error) {
             return Promise.reject(new Error("Error | SucursalService"));
        }
    }
    async registrarSurcursal(agregarSucursalDTO: AgregarSucursalDTO): Promise<boolean> {
        try {
            let newSucursal = new Sucursales();
            newSucursal.Nombre = agregarSucursalDTO.Nombre;
            newSucursal.CelularSucursal = agregarSucursalDTO.CelularSucursal;
            newSucursal.Direccion = agregarSucursalDTO.Direccion;
            newSucursal.Referencia = agregarSucursalDTO.Referencia;
            let result = await this.sucursalService.save(newSucursal)
            if(result == null) { return false }
            return true;
        } catch (error) {
            return Promise.reject(new Error("Error | SucursalService | registrarSurcursal"));
        }

    }
    async editarSurcursal(sucursalDTO: SucursalDTO): Promise<boolean> {
        try {

            let editSurcursal =   await this.sucursalService
                            .findOne({ 
                                    where : { 
                                        IdSucursal : sucursalDTO.IdSucursal,
                                    } 
                                    })

            if(editSurcursal == null) { return Promise.reject(new Error("Surcursal no existe")); }  
            editSurcursal.Nombre = sucursalDTO.Nombre
            editSurcursal.CelularSucursal = sucursalDTO.CelularSucursal
            editSurcursal.Direccion = sucursalDTO.Direccion
            editSurcursal.Referencia = sucursalDTO.Referencia

            let result = await this.sucursalService.save(editSurcursal);

            if(result == null) { return false }
            return true;
        } catch (error) {
            return Promise.reject(new Error("Error | SucursalService"));
        }
    }

    async obtenerSucursalModel(IdSucursal : number): Promise<Sucursales> {
        
        try {
            
            let result = await  this.sucursalService.findOne(
                                                            { 
                                                            where : {
                                                                IdSucursal : IdSucursal 
                                                                    }
                                                            }
                                                            );
            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }                                            
            return  new Promise<Sucursales>((resolve ,reject ) => {
                resolve(result)
        })               
        } catch (error) {
            return Promise.reject(new Error("Error | SucursalService | obtenerSucursal"));
        }
    }
}