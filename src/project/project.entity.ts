import { TaskEntity } from 'src/task/task.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'project' })
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    description?: string

    @Column()
    initialDate: Date

    @Column()
    finalDate: Date

    @ManyToOne(() => UserEntity, (user) => user.projects)
    user: UserEntity;

    @OneToMany(() => TaskEntity, (task) => task.project)
    tasks?: TaskEntity[]

}