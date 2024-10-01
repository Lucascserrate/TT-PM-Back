import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './dto/task.enum';

@Entity({ name: 'task' })
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}