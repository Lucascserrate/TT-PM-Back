import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'project' })
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    initialDate: Date

    @Column()
    finalDate: Date

}