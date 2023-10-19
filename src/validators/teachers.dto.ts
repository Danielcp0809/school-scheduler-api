import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateTeacherDto {
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;
}

export class UpdateProductDto extends PartialType(CreateTeacherDto) {
    @ValidateIf(o => !o.first_name && !o.last_name)
    @IsNotEmpty({ message: 'At least one parameter should be provided' })
    @IsString()
    readonly first_name: string;

    @IsNotEmpty({ message: 'At least one parameter should be provided' })
    @IsString()
    readonly last_name: string;
}