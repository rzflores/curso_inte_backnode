
import {Entity , BaseEntity , PrimaryGeneratedColumn , Column} from 'typeorm'

@Entity()
export class Cupones extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdCupon : number;
    @Column()
    Codigo : string;
    @Column({type: "decimal", precision: 4, scale: 2, default: 0})
    PorcentajeDescuento : number;
    @Column({type:"date"})
    FechaVencimiento : string;
    @Column()
    EsHabilitado : boolean;
   
}


