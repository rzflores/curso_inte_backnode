import {Entity , BaseEntity , PrimaryGeneratedColumn , Column} from 'typeorm'

@Entity()
export class UnidadMedidas extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdUnidadMedida : number;
    @Column()
    Numero : number;
    @Column()
    NombreGramajeLargo : string;
    @Column()
    NombreGramajeCorto : string;
}
