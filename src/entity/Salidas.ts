import {Entity , BaseEntity , PrimaryGeneratedColumn , Column, OneToOne, JoinTable} from 'typeorm'
import { Usuarios } from './Usuarios';

@Entity()
export class Salidas extends BaseEntity{
    @PrimaryGeneratedColumn()
    idSalida : number;
    @Column({type:"date"})
    fechaSalida : string;
    @Column()
    cantidadSalida : number;
    @OneToOne(() => Usuarios)
    @JoinTable()
    UsuariosidUsuarios : number
}



