import { Repository } from 'typeorm';
import { dbConect }  from '../configDb/FileConfigDb';
import { Usuarios } from '../entity/Usuarios';
import { UsuarioInterface } from '../types/user.type';
import { AuthRepository } from '../repo/auth.repository';
import { LoginDTO } from '../DTO/LoginDTO';
import { generarJWT } from '../helpers/generarJWT'
import { verificarExpiracionJWT } from '../helpers/verificarExpiracionJWT';
import { RenovarTokenInterface } from '../types/auth.type';
import { RolInterface } from '../types/rol.type';

export default class AuthService implements AuthRepository
{
    private readonly usuarioService: Repository<Usuarios> = dbConect.getRepository(Usuarios); 
    constructor(){}
   
    async login(login: LoginDTO): Promise<UsuarioInterface> {
        try {
            
          
            let result = await this.usuarioService
                                    .createQueryBuilder('usuarios')
                                    .leftJoinAndSelect('usuarios.RolesidRoles', 'roles')
                                    .where('usuarios.NombreUsuario = :NombreUsuario', { NombreUsuario: login.NombreUsuario })
                                    .where('usuarios.Contrasena = :Contrasena', { Contrasena: login.Contrasenia })
                                    .getOne();                                    


            
            if(result == null) { return Promise.reject(new Error("Usuario o contraseña invalida.")); }
            //generar jwt
            result.Token = generarJWT( result.IdUsuario , result.NombreUsuario ); 
            result.save()

            let itemRol : RolInterface = {
                IdRol : result.RolesidRoles.IdRol,
                Nombre : result.RolesidRoles.Nombre
            }                         

            let usuario : UsuarioInterface = {
                    IdUsuario: result.IdUsuario ,
                    Nombres: result.Nombres,
                    Apellidos: result.Apellidos,
                    Celular: result.Celular,
                    NombreUsuario: result.NombreUsuario,
                    Contrasena: result.Contrasena,
                    EsHabilitado: result.EsHabilitado,
                    Token: result.Token,
                    Rol : itemRol
            }
            
            return  new Promise<UsuarioInterface>((resolve ,reject ) => {
                    resolve(usuario)
            })
        } catch (error) {
            return Promise.reject(new Error("UsuarioService | Error en el login"));
        }

    }

    async renovarToken(loginDto : LoginDTO): Promise<RenovarTokenInterface> {

        let usuario =   await this.usuarioService
        .findOne({ 
                where : { 
                    NombreUsuario : loginDto.NombreUsuario,
                    Contrasena : loginDto.Contrasenia 
                } 
                })
            if(usuario == null){ return Promise.reject(new Error("Usuario o Contrasena invalido")); }        

            let newToken =  generarJWT( usuario.IdUsuario , usuario.NombreUsuario );
            usuario.Token = newToken;
            usuario.save()
        return {
            ok : true,
            newToken
        }
    }
}