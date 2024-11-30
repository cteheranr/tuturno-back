import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'modulo'})

export class Modulo {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    id_usuario: string;

    @Column()
    is_busy: number;

}
