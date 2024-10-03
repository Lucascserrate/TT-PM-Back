import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './dto/task.enum';
import { ProjectEntity } from 'src/project/project.entity';
import { UserEntity } from 'src/user/user.entity';

@Entity({ name: 'task' })
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
    status: TaskStatus;

    @ManyToOne(() => ProjectEntity, (project) => project.tasks)
    project: ProjectEntity

    @ManyToOne(() => UserEntity, (user) => user.tasks)
    user: UserEntity
}