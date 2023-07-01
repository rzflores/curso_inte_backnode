import { LoginDTO } from '../DTO/LoginDTO'
import { RenovarTokenInterface } from '../types/auth.type';
import { UsuarioInterface } from '../types/user.type';
export interface AuthRepository{
    login (login : LoginDTO) : Promise<UsuarioInterface> | null
    renovarToken(loginDto : LoginDTO) : Promise<RenovarTokenInterface>
}  