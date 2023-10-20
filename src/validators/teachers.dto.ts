import { IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';
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

export class UpdateProductDto extends PartialType(CreateTeacherDto) { }