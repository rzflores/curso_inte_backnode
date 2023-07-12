import {Entity , BaseEntity , PrimaryGeneratedColumn , Column , ManyToOne} from 'typeorm'
import { Roles } from './Roles';
import { Sucursales } from './Sucursales';
import { Productos } from './Productos';

@Entity()
export class Kardex extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdKardex : number;
    @Column()
    TipoMovimiento : string;
    @Column({ type : 'date' })
    FechaVencimiento : string;
    @Column()
    CantidadMovimiento : number;
    @ManyToOne(() => Productos, producto => producto.IdProducto)
    RolesIdRoles: Roles;
    @ManyToOne(() => Sucursales, sucursal => sucursal.IdSucursal)
    SurcursalIdSucursal: Sucursales;
}

