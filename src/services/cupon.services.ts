import { Repository } from "typeorm";
import { dbConect } from "../configDb/FileConfigDb";
import { CuponDTO } from "../DTO/CuponDTO";
import { RolInterface } from "../types/rol.type";
import { CuponInterface } from "../types/cupon.type";
import { Cupones } from "../entity/Cupones";
import { CuponRepository } from "../repo/cupon.repository";
import { AgregarCuponDTO } from "../DTO/AgregarCuponDTO";

export default class CuponService implements CuponRepository{

    private readonly CuponService: Repository<Cupones> = dbConect.getRepository(Cupones); 

    constructor(){

    }
  
    async obtenerCupon(IdCupon: number): Promise<CuponInterface> {
        
        try {
            let result = await  this.CuponService.findOne(
                { 
                where : {
                    IdCupon : IdCupon 
                        }
                }
                );

            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }
                                                
            return  new Promise<CuponInterface>((resolve ,reject ) => {
                resolve(result)
        })               
        } catch (error) {            
            return Promise.reject(new Error("Error | Cuponervice | obtenerCupon"));
        }
    }
    async obtenerCuponModel(IdCupon: number): Promise<Cupones> {
        
        try {
            let result = await  this.CuponService.findOne(
                { 
                where : {
                    IdCupon : IdCupon 
                        }
                }
                );

            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }
                                                
            return  new Promise<Cupones>((resolve ,reject ) => {
                resolve(result)
        })               
        } catch (error) {            
            return Promise.reject(new Error("Error | Cuponervice | obtenerCupon"));
        }
    }
    async obtenerCupones(): Promise<CuponInterface[]> {
        try {
            let result = await  this.CuponService.find()
            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }

            let lstCupones : CuponInterface[] = []

            result.forEach((e) => {
                let itemCupon : CuponInterface ={
                    IdCupon : e.IdCupon,
                    Codigo : e.Codigo,
                    PorcentajeDescuento :  e.PorcentajeDescuento,
                    FechaVencimiento : e.FechaVencimiento,
                    EsHabilitado : e.EsHabilitado
                }

                lstCupones.push(itemCupon);
            })

            return  new Promise<CuponInterface[]>((resolve ,reject ) => {
                  resolve(lstCupones)
             })               
        } catch (error) {
             return Promise.reject(new Error("Error | CuponService"));
        }
    }
    async registrarCupon(agregarCuponDTO: AgregarCuponDTO): Promise<boolean> {
        try {
            let newCupon = new Cupones();
            newCupon.Codigo = agregarCuponDTO.Codigo;
            newCupon.PorcentajeDescuento = agregarCuponDTO.PorcentajeDescuento;
            newCupon.FechaVencimiento = agregarCuponDTO.FechaVencimiento.toString();
            newCupon.EsHabilitado = agregarCuponDTO.EsHabilitado;
            let result = await this.CuponService.save(newCupon)
            if(result == null) { return false }
            return true;
        } catch (error) {
            return Promise.reject(new Error("Error | CuponService | registrarCupon"));
        }
    }
    async editarCupon(CuponDTO: CuponDTO): Promise<boolean> {
        try {

            let editCupon =   await this.CuponService
                            .findOne({ 
                                    where : { 
                                        IdCupon : CuponDTO.IdCupon,
                                    } 
                                    })

            if(editCupon == null) { return Promise.reject(new Error("Cupon no existe")); }  
            editCupon.Codigo = CuponDTO.Codigo;
            editCupon.PorcentajeDescuento = CuponDTO.PorcentajeDescuento;
            editCupon.FechaVencimiento = CuponDTO.FechaVencimiento.toString();
            editCupon.EsHabilitado = CuponDTO.EsHabilitado;
            let result = await this.CuponService.save(editCupon);
            if(result == null) { return false }
            return true;
        } catch (error) {
            console.log(error.message)
            return Promise.reject(new Error("Error | CuponService | editarCupon"));
        }
    }
    async verificarCupon(CodigoCupon: string): Promise<CuponInterface> {
        
        try {
            let result = await  this.CuponService.findOne(
                { 
                where : {
                    Codigo : CodigoCupon 
                        }
                }
                );

            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }
               
            let fechaCupon = new Date(result.FechaVencimiento).getTime()
            if( fechaCupon < Date.now() ){
                return Promise.reject(new Error("Cupon Vencido")); 
            }

            return  new Promise<CuponInterface>((resolve ,reject ) => {
                resolve(result)
        })               
        } catch (error) {            
            return Promise.reject(new Error("Error | Cuponervice | obtenerCupon"));
        }
    }



}