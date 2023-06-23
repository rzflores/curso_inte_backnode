import {Entity , BaseEntity , PrimaryGeneratedColumn , Column , OneToOne, JoinColumn} from 'typeorm'
import { Roles } from './Roles';

@Entity()
export class Usuarios extends BaseEntity{
    @PrimaryGeneratedColumn()
    idUsuario : number;
    @Column()
    Nombres : string;
    @Column()
    Apellidos : string;
    @Column()
    Celular : string;
    @Column()
    nombreUsuario : string;
    @Column()
    Contrasena : string;
    @Column()
    esHabilitado : boolean;
    @Column()
    token : string
    @OneToOne(() => Roles)
    @JoinColumn()
    RolesidRoles: Roles
}

