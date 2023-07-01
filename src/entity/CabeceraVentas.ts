import {Entity , BaseEntity , PrimaryGeneratedColumn , Column ,OneToMany, OneToOne, JoinColumn} from 'typeorm'
import { Cupones } from './Cupones';
import { DetalleVentas } from './DetalleVentas';

@Entity()
export class CabeceraVentas extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdCabeceraVenta : number;
    @Column({type: "decimal", precision: 4, scale: 4, default: 0})
    TotalVenta : number;
    @Column({type:"date"})
    FechaVenta : string;
    @OneToOne(() => Cupones)
    @JoinColumn()
    CuponesIdCupones: Cupones
    @OneToMany(() => DetalleVentas, detalle => detalle.IdDetalleVenta)
    DetalleVentasIdDetalleVentas: DetalleVentas[];
}

  