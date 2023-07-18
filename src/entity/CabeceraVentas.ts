import {Entity , BaseEntity , PrimaryGeneratedColumn , Column ,OneToMany, OneToOne, JoinColumn, ManyToOne} from 'typeorm'
import { Cupones } from './Cupones';
import { DetalleVentas } from './DetalleVentas';

@Entity()
export class CabeceraVentas extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdCabeceraVenta : number;
    @Column({type: "decimal", precision: 8, scale: 4, default: 0})
    TotalVenta : number;
    @Column({type:"date"})
    FechaVenta : string;
    @ManyToOne(() => Cupones , cupon => cupon.IdCupon)
    IdCupon: Cupones
    @OneToMany(() => DetalleVentas, detalle => detalle.IdDetalleVenta)
    DetalleVentasIdDetalleVentas: DetalleVentas[];
}

  