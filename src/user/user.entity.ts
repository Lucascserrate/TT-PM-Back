import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './dto/user.enum';


@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    role: Role

}
