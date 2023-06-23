import {Entity , BaseEntity , PrimaryGeneratedColumn , Column ,OneToMany, OneToOne, JoinColumn} from 'typeorm'
import { Cupones } from './Cupones';
import { DetalleVentas } from './DetalleVentas';

@Entity()
export class CabeceraVentas extends BaseEntity{
    @PrimaryGeneratedColumn()
    idCabeceraVenta : number;
    @Column({type: "decimal", precision: 4, scale: 4, default: 0})
    totalVenta : number;
    @Column({type:"date"})
    fechaVenta : string;
    @OneToOne(() => Cupones)
    @JoinColumn()
    CuponesidCupones: Cupones
    @OneToMany(() => DetalleVentas, detalle => detalle.idDetalleVenta)
    DetalleVentasidDetalleVentas: DetalleVentas[];
}

  