import {Entity , BaseEntity , PrimaryGeneratedColumn , Column ,OneToMany, OneToOne, JoinColumn} from 'typeorm'
import { Categorias } from './Categorias';
import { UnidadMedidas } from './UnidadMedidas';
import { Entradas } from './Entradas';
import { Salidas } from './Salidas';
import { Productos } from './Productos';

@Entity()
export class Kardex extends BaseEntity{
    @PrimaryGeneratedColumn()
    idKardex : number;
    @Column({ type:"date" })
    fechaMovimiento : string;
    @Column()
    cantidadMovimiento : number;
    @Column({type: "decimal", precision: 4, scale: 4, default: 0})
    precioMovimiento : number;
    @Column({ length : 1})
    tipoMovimiento : string;
    @OneToOne(() => Entradas)
    @JoinColumn()
    EntradasidEntradas : number;
    @OneToOne(() => Salidas)
    @JoinColumn()
    SalidasidSalidas : number;
    @OneToMany(() => Productos, producto => producto.idProducto)
    ProductosidProductos: Productos[];

}
