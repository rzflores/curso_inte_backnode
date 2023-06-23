import {Entity , BaseEntity , PrimaryGeneratedColumn , Column, OneToOne, JoinTable} from 'typeorm'
import { Usuarios } from './Usuarios';

@Entity()
export class Sucursales extends BaseEntity{
    @PrimaryGeneratedColumn()
    idSucursal : number;
    @Column()
    Nombre : string;
    @Column({ type:"int" , width : 9 })
    CelularSucursal : number;
    @Column()
    Direccion : string;
    @Column()
    Referencia : string;
    @OneToOne(() => Usuarios)
    @JoinTable()
    UsuariosidUsuarios : number
}


