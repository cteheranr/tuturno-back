import { Role } from 'src/shared/enums/roles.enum';
import { Turn } from 'src/turn/entities/turn.entity';
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity, OneToMany } from 'typeorm';

@Entity({name: 'staff'})
export class Personal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  first_name: string;

  @Column()
  second_name: string;

  @Column()
  surname: string;

  @Column()
  second_surname: string;

  @Column()
  no_identification: string;

  @Column()
  role: Role;

}
