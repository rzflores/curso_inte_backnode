import {Entity , BaseEntity , PrimaryGeneratedColumn , Column , OneToOne, JoinColumn} from 'typeorm'
import { CabeceraVentas } from './CabeceraVentas'
@Entity()
export class Boletas extends BaseEntity{
    @PrimaryGeneratedColumn()
    idBoleta : number;
    @Column()
    Numero : number;
    @Column()
    Codigo : string;
    @Column({ type: "date" })
    fechaBoleta : string;
    @OneToOne(() => CabeceraVentas)
    @JoinColumn()
    CabeceraVentasidCabeceraVentas: CabeceraVentas
}
