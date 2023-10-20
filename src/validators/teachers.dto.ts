import { IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Param, applyDecorators } from '@nestjs/common';
export class CreateTeacherDto {
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;
}

export class UpdateProductDto extends PartialType(CreateTeacherDto) { }