import { Repository } from "typeorm";
import { dbConect } from "../configDb/FileConfigDb";
import { Roles } from "../entity/Roles";
import { RolInterface } from "../types/rol.type";
import { MenuRepository } from "../repo/menu.repository";
import { CamEstMenusDTO } from "../DTO/CamEstMenusDTO";
import { MenuInterface } from "../types/menu.type";
import { Menus } from "../entity/Menus";

export default class MenuService implements MenuRepository {

    private readonly menuService: Repository<Menus> = dbConect.getRepository(Menus); 

    constructor(){

    }
    async cambiarEstadoMenus(CamEstMenus: CamEstMenusDTO): Promise<boolean> {
        try {

            const resultMenus = await this.menuService
                                    .createQueryBuilder('menus')
                                    .leftJoinAndSelect('menus.RolesIdRoles', 'roles')
                                    .where('roles.IdRol = :IdRol', { IdRol: CamEstMenus.IdRol })
                                    .orderBy('menus.Orden','ASC')
                                    .getMany();

            if(resultMenus == null) { return Promise.reject(new Error("No se encontraron resultados")); }

            resultMenus.forEach(e => {
                CamEstMenus.ListaMenus.forEach( i => {
                    if(e.IdMenu === i.IdMenu)
                    {
                        e.EsHabilitado = i.EsHabilitado                        
                        this.menuService.save(e)
                    }
                })
            })
             return  new Promise<boolean>((resolve ,reject ) => {
                 resolve(true)
        })               
        } catch (error) {
            console.log(error)
            return Promise.reject(new Error("Error | MenuService | obtenerMenusRol"));
        }
    }
    async obtenerMenusRol(IdRol: number): Promise<MenuInterface[]> {
        try {
            const result = await this.menuService
            .createQueryBuilder('menus')
            .leftJoinAndSelect('menus.RolesIdRoles', 'roles')
            .where('roles.IdRol = :IdRol', { IdRol: IdRol })
            .orderBy('menus.Orden','ASC')
            .getMany();

            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }
            return  new Promise<MenuInterface[]>((resolve ,reject ) => {
                resolve(result)
        })               
        } catch (error) {
            console.log(error)
            return Promise.reject(new Error("Error | MenuService | obtenerMenusRol"));
        }
    }
   
   
  
}