import {Entity , BaseEntity , PrimaryGeneratedColumn , Column} from 'typeorm'

@Entity()
export class Categorias extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdCategoria : number;
    @Column()
    Nombre : string;
   
}