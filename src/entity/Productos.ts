import {Entity , BaseEntity , PrimaryGeneratedColumn , Column ,ManyToOne, OneToOne, JoinColumn} from 'typeorm'
import { Categorias } from './Categorias';
import { UnidadMedidas } from './UnidadMedidas';

@Entity()
export class Productos extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdProducto : number;
    @Column()
    NombreProducto : string;
    @Column()
    DescripcionProducto : string;
    @Column()
    NombreUsuario : string;
    @Column({type: "decimal", precision: 4, scale: 4, default: 0})
    PrecioUnitario : number;
    @Column()
    StockActual : number;
    @Column({ type: "date" })
    FechaVencimiento : string
    @OneToOne(() => Categorias)
    @JoinColumn()
    CategoriasidCategorias: Categorias
    @OneToOne(() => UnidadMedidas)
    @JoinColumn()
    UnidadMedidasidUnidadMedidas: UnidadMedidas
   
}

