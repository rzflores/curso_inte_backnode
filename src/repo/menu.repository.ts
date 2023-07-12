import { CamEstMenusDTO } from "../DTO/CamEstMenusDTO";
import { MenuInterface } from "../types/menu.type";

export interface MenuRepository{
    cambiarEstadoMenus( camEstMenus : CamEstMenusDTO  ) : Promise<boolean>
    obtenerMenusRol(IdRol: number) : Promise<MenuInterface[]>
}