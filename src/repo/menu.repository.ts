import { CamEstMenusDTO } from "../DTO/CamEstMenusDTO";
import { MenuRolDTO } from "../DTO/MenuRolDTO"

export interface MenuRepository{
    cambiarEstadoMenus( camEstMenus : CamEstMenusDTO  ) : Promise<boolean>
    obtenerMenusRol() : Promise<MenuRolDTO[]>
}