import {Entity , BaseEntity , PrimaryGeneratedColumn , Column ,ManyToOne, OneToOne, JoinColumn} from 'typeorm'
import { Categorias } from './Categorias';
import { UnidadMedidas } from './UnidadMedidas';
import { Kardex } from './Kardex';

@Entity()
export class Productos extends BaseEntity{
    @PrimaryGeneratedColumn()
    idProducto : number;
    @Column()
    nombreProducto : string;
    @Column()
    descripcionProducto : string;
    @Column()
    nombreUsuario : string;
    @Column({type: "decimal", precision: 4, scale: 4, default: 0})
    precioUnitario : number;
    @Column()
    stockActual : number;
    @OneToOne(() => Categorias)
    @JoinColumn()
    CategoriasidCategorias: Categorias
    @OneToOne(() => UnidadMedidas)
    @JoinColumn()
    UnidadMedidasidUnidadMedidas: UnidadMedidas
    @ManyToOne(() => Kardex, kardex => kardex.idKardex)
    KardexidKardex: Kardex;

}

