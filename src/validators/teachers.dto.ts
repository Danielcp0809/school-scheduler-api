import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeacherDto {
    @IsNotEmpty()
    @IsString()
    first_name: string;
    
    @IsNotEmpty()
    @IsString()
    last_name: string;
}

export class UpdateProductDto{
    @IsString()
    first_name?: string;
    
    @IsString()
    last_name?: string;
}