import {Entity , BaseEntity , PrimaryGeneratedColumn , Column} from 'typeorm'

@Entity()
export class Roles extends BaseEntity{
    @PrimaryGeneratedColumn()
    IdRol : number;
    @Column()
    Nombre : string;
   
}

