import { Repository   } from "typeorm";
import  { dbConect }  from "../configDb/FileConfigDb";
import { Usuarios } from "../entity/Usuarios";

export class AuthService
{
    private static usuarioService: Repository<Usuarios> =  dbConect.getRepository(Usuarios);
    constructor(
    ){
        //AuthService.usuarioService = dbConect.getRepository(Usuarios);
    }

    static async login(){
        const query = await this.usuarioService
        .createQueryBuilder()
        .addSelect('*')
        .from(Usuarios, 'u')
        .getOne();
        console.log(query)
        return query;
    }
    static async renovarToken(){

    }
}