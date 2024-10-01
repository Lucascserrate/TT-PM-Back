import { IsDate, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsDate()
    initialDate: Date;

    @IsDate()
    finalDate: Date;
}