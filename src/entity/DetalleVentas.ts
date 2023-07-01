import {Entity , BaseEntity , PrimaryGeneratedColumn , Column,ManyToOne , OneToOne, JoinColumn, OneToMany} from 'typeorm'
import { Productos } from './Productos';
import { CabeceraVentas } from './CabeceraVentas';

@Entity()
export class DetalleVentas extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdDetalleVenta : number;
    @Column()
    Cantidad : string;
    @Column()
    DescripcionProducto : string;
    @Column()
    SubTotal : string;
    @Column({type: "decimal", precision: 4, scale: 4, default: 0})
    PrecioUnitario : number;
    @Column()
    StockActual : number;
    @ManyToOne(() => CabeceraVentas, cabecera => cabecera.DetalleVentasIdDetalleVentas)
    CabeceraVentasIdCabeceraVentas: CabeceraVentas;
    @OneToOne(() => Productos)
    @JoinColumn()
    ProductosidProducto: Productos
    
    

}

