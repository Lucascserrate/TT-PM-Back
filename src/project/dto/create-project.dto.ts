import { Transform } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    initialDate: Date;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    finalDate: Date;
}