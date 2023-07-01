import {Entity , BaseEntity , PrimaryGeneratedColumn , Column , ManyToOne , OneToOne, JoinColumn} from 'typeorm'
import { Sucursales } from './Sucursales';
import { CabeceraEnvios } from './CabeceraEnvios';
import { Productos } from './Productos';
@Entity()
export class DetalleEnvios extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdDetalleEnvio : number;
    @Column()
    Cantidad : number;
    @Column( { type: 'decimal' } )
    SubTotal : number;
    @OneToOne(() => Sucursales)
    @JoinColumn()
    IdSucursalOrigen: Sucursales
    @OneToOne(() => Sucursales)
    @JoinColumn()
    IdSucursalDestino: Sucursales
    @ManyToOne(() => CabeceraEnvios, cabeceraEnvios => cabeceraEnvios.DetalleEnviosIdDetalleEnvios)
    CabeceraVentasIdCabeceraVentas: CabeceraEnvios;
    @OneToOne(() => Productos)
    @JoinColumn()
    ProductosIdProducto: Productos
}