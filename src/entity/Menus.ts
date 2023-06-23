import {Entity , BaseEntity , PrimaryGeneratedColumn , Column , OneToOne, JoinColumn} from 'typeorm'
import { Roles } from './Roles';

@Entity()
export class Menus extends BaseEntity{
    @PrimaryGeneratedColumn()
    idMenu : number;
    @Column()
    Nombre : string;
    @Column()
    Orden : number;
    @Column()
    Link : string;
    @Column()
    esHabilitado : boolean;
    @OneToOne(() => Roles)
    @JoinColumn()
    RolesidRoles: Roles
}

