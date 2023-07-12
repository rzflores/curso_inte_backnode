import {Entity , BaseEntity , PrimaryGeneratedColumn , Column ,ManyToOne, OneToOne, JoinColumn} from 'typeorm'
import { Categorias } from './Categorias';
import { UnidadMedidas } from './UnidadMedidas';
import { Sucursales } from './Sucursales';

@Entity()
export class Productos extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdProducto : number;
    @Column()
    NombreProducto : string;
    @Column()
    DescripcionCorta : string;
    @Column()
    DescripcionLarga : string;
    @Column({type: "decimal", precision: 4, scale: 2, default: 0})
    PrecioUnitario : number;
    @Column()
    StockActual : number;
    @Column()
    UrlImagen : string;
    @Column({ type: "date" })
    FechaVencimiento : string
    @ManyToOne(() => Categorias, categoria => categoria.IdCategoria)
    CategoriaIdCategoria: Categorias;
    @ManyToOne(() => UnidadMedidas, unidadMedida => unidadMedida.IdUnidadMedida)
    UnidadMedidasIdUnidadMedidas: UnidadMedidas;
    @ManyToOne(() => Sucursales, sucursal => sucursal.IdSucursal)
    SurcursalIdSucursal: Sucursales;
}

