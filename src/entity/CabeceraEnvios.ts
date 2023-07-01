import {Entity , BaseEntity , PrimaryGeneratedColumn , Column , OneToMany , OneToOne, JoinColumn} from 'typeorm'
import { Sucursales } from './Sucursales';
import { DetalleEnvios } from './DetalleEnvios';
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
    @OneToOne(() => Sucursales)
    @JoinColumn()
    IdSucursalOrigen: Sucursales
    @OneToOne(() => Sucursales)
    @JoinColumn()
    IdSucursalDestino: Sucursales
    @OneToMany(() => DetalleEnvios, detalleEnvios => detalleEnvios.IdDetalleEnvio)
    DetalleEnviosIdDetalleEnvios: DetalleEnvios[];

}