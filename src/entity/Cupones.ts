
import {Entity , BaseEntity , PrimaryGeneratedColumn , Column} from 'typeorm'

@Entity()
export class Cupones extends BaseEntity{
    @PrimaryGeneratedColumn()
    idCupon : number;
    @Column()
    Codigo : string;
    @Column({type: "decimal", precision: 4, scale: 4, default: 0})
    porcentajeDescuento : number;
    @Column({type:"date"})
    fechaVencimiento : string;
    @Column()
    esHabilitado : boolean;
   
}


