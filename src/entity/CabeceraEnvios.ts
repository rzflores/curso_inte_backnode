import {Entity , BaseEntity , PrimaryGeneratedColumn , Column , OneToMany , OneToOne, JoinColumn, ManyToOne} from 'typeorm'
import { Sucursales } from './Sucursales';
import { DetalleEnvios } from './DetalleEnvios';
import { Usuarios } from './Usuarios';
@Entity()
export class CabeceraEnvios extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdCabeceraEnvio : number;
    @Column({type:"date"})
    FechaSalida : string;
    @Column({type: "date"})
    FechaLlegada : string;
    @Column({ length : 100 })
    NombreConductor : string
    @Column({ length: 9})
    CelularConductor : string
    @Column({ length:15 })
    PlacaVehiculo : string
    @ManyToOne(() => Usuarios , usuario => usuario.IdUsuario)
    IdUsuario: Usuarios
    @ManyToOne(() => Sucursales , sucursal => sucursal.IdSucursal)
    IdSucursalOrigen: Sucursales
    @ManyToOne(() => Sucursales , sucursal => sucursal.IdSucursal)
    IdSucursalDestino: Sucursales
    @OneToMany(() => DetalleEnvios, detalleEnvios => detalleEnvios.IdDetalleEnvio)
    DetalleEnviosIdDetalleEnvios: DetalleEnvios[];

}