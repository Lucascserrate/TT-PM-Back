import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    initialDate: Date;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    finalDate: Date;

    @IsNumber()
    @IsOptional()
    userId?: number
}