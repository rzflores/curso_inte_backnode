import {Entity , BaseEntity , PrimaryGeneratedColumn , Column} from 'typeorm'

@Entity()
export class Roles extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    Nombre : string;
   
}

