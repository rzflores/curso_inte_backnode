import {Entity , BaseEntity , PrimaryGeneratedColumn , Column , OneToOne, JoinColumn} from 'typeorm'
import { CabeceraVentas } from './CabeceraVentas'
@Entity()
export class Boletas extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdBoleta : number;
    @Column()
    Numero : number;
    @Column()
    Codigo : string;
    @Column({ type: "date" })
    FechaBoleta : string;
    @OneToOne(() => CabeceraVentas)
    @JoinColumn()
    CabeceraVentasIdCabeceraVentas: CabeceraVentas
}
