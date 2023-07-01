import {Entity , BaseEntity , PrimaryGeneratedColumn , Column , OneToOne, JoinColumn} from 'typeorm'
import { Roles } from './Roles';

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
    @OneToOne(() => Roles)
    @JoinColumn()
    RolesidRoles: Roles
}

