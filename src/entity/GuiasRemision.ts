import {Entity , BaseEntity , PrimaryGeneratedColumn , Column , OneToOne, JoinColumn} from 'typeorm'
import { CabeceraEnvios } from './CabeceraEnvios';
@Entity()
export class GuiasRemision extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdGuiaRemision : number;
    @Column({length:3})
    Numero : string;
    @Column({length: 2})
    Codigo : string;
    @Column({type: "date"})
    FechaGuia : string
    @OneToOne(() => CabeceraEnvios)
    @JoinColumn()
    CabeceraEnviosIdCabeceraEnvio : CabeceraEnvios

}