import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'turn-config'})
export class TurnConfig {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    chart: string;

    @Column({default: 'ACTIVE'})
    status: string;
}
