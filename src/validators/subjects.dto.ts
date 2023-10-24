import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateSubjectDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Name of the subject' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Description of the subject' })
    description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Color of the subject in hexadecimal' })
    color: string;

    @IsUUID(undefined, { each: true})
    @IsArray()
    @ApiProperty({ description: 'Teachers id' })
    teachers_id?: string[];
}

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
    is_enabled?: boolean;
}