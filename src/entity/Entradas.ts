import {Entity , BaseEntity , PrimaryGeneratedColumn , Column, OneToOne, JoinTable} from 'typeorm'
import { Usuarios } from './Usuarios';

@Entity()
export class Entradas extends BaseEntity{
    @PrimaryGeneratedColumn()
    idEntrada : number;
    @Column({type:"date"})
    fechaEntrada : string;
    @Column()
    cantidadEntrada : number;
    @OneToOne(() => Usuarios)
    @JoinTable()
    UsuariosidUsuarios : number
}

