import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateSchoolDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "School's name" })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "School's address" })
    address: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "School's phone number" })
    phone: string;
}

export class UpdateSchoolDto extends PartialType(CreateSchoolDto) { }