import { IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf, IsPositive, Min } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
export class CreateTeacherDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The first name of the teacher' })
    first_name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'The last name of the teacher' })
    last_name: string;
}

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) { }

export class FiltersTeachersDto {
    @IsOptional()
    @IsPositive()
    limit?: number;

    @IsOptional()
    @Min(0)
    offset?: number;

    @IsOptional()
    @IsString()
    search?: string;
}