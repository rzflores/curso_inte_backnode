import {Entity , BaseEntity , PrimaryGeneratedColumn , Column,ManyToOne , OneToOne, JoinColumn, OneToMany} from 'typeorm'
import { Productos } from './Productos';
import { CabeceraVentas } from './CabeceraVentas';

@Entity()
export class DetalleVentas extends BaseEntity{
    @PrimaryGeneratedColumn()
    idDetalleVenta : number;
    @Column()
    Cantidad : string;
    @Column()
    descripcionProducto : string;
    @Column()
    subTotal : string;
    @Column({type: "decimal", precision: 4, scale: 4, default: 0})
    precioUnitario : number;
    @Column()
    stockActual : number;
    @ManyToOne(() => CabeceraVentas, cabecera => cabecera.DetalleVentasidDetalleVentas)
    CabeceraVentasidCabeceraVentas: CabeceraVentas;
    @OneToOne(() => Productos)
    @JoinColumn()
    ProductosidProducto: Productos
    
    

}

