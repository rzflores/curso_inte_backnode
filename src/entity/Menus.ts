import {Entity , BaseEntity , PrimaryGeneratedColumn , Column , OneToOne, JoinColumn} from 'typeorm'
import { Roles } from './Roles';

@Entity()
export class Menus extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdMenu : number;
    @Column()
    Nombre : string;
    @Column()
    Orden : number;
    @Column()
    Link : string;
    @Column()
    EsHabilitado : boolean;
    @OneToOne(() => Roles)
    @JoinColumn()
    RolesidRoles: Roles
}

