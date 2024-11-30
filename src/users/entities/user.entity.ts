import { Role } from "src/shared/enums/roles.enum";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ type: 'enum', enum: Role })
    role: Role;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column({default: 'ACTIVE'})
    status: string;
}
