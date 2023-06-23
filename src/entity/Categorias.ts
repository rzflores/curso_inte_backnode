import {Entity , BaseEntity , PrimaryGeneratedColumn , Column} from 'typeorm'

@Entity()
export class Categorias extends BaseEntity{
    @PrimaryGeneratedColumn()
    idCategoria : number;
    @Column()
    Nombre : string;
   
}