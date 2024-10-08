import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './dto/user.enum';
import { ProjectEntity } from 'src/project/project.entity';
import { TaskEntity } from 'src/task/task.entity';


@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ default: Role.USER })
    role: Role

    @OneToMany(() => ProjectEntity, (project) => project.user)
    projects?: ProjectEntity[];

    @OneToMany(() => TaskEntity, (task) => task.user)
    tasks?: TaskEntity[];

}
