import {Entity , BaseEntity , PrimaryGeneratedColumn , Column,ManyToOne , OneToOne, JoinColumn, OneToMany} from 'typeorm'
import { Productos } from './Productos';
import { CabeceraVentas } from './CabeceraVentas';

@Entity()
export class DetalleVentas extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdDetalleVenta : number;
    @Column()
    Cantidad : number;
    @Column()
    SubTotal : number;
    @ManyToOne(() => CabeceraVentas, cabecera => cabecera.DetalleVentasIdDetalleVentas)
    CabeceraVentasIdCabeceraVentas: CabeceraVentas;
    @ManyToOne(() => Productos , producto => producto.IdProducto)
    ProductosIdProducto: Productos
}

