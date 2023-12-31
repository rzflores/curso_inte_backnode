import {Entity , BaseEntity , PrimaryGeneratedColumn , Column , ManyToOne} from 'typeorm'
import { Roles } from './Roles';
import { Sucursales } from './Sucursales';

@Entity()
export class Usuarios extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdUsuario : number;
    @Column()
    Nombres : string;
    @Column()
    Apellidos : string;
    @Column()
    Celular : string;
    @Column()
    NombreUsuario : string;
    @Column()
    Contrasena : string;
    @Column()
    EsHabilitado : boolean;
    @Column()
    Token : string
    @ManyToOne(() => Roles, rol => rol.IdRol)
    RolesIdRoles: Roles;
    @ManyToOne(() => Sucursales, sucursal => sucursal.IdSucursal)
    SurcursalIdSucursal: Sucursales;
}

