import { Personal } from "src/personal/entities/personal.entity";
import { StatusTurn } from "src/shared/enums/status-turn.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'turn'})
export class Turn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente: string;

  @Column()
  id_usuario: number;

  @Column()
  fecha_creacion: Date;

  @Column()
  estado_turno: StatusTurn;

  @Column()
  tipo_turno: string;

  @Column()
  numero_turno: number;
}
