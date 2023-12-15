import { IsNotEmpty, IsOptional, IsString, IsPositive, Min, IsNumber, IsArray, ValidateNested, Validate } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateBreakDto } from './breaks.dto';

export class CreateSettingsDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Name of the schedule settings' })
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Hour size in seconds' })
    hour_size: number;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Schedule start time in seconds' })
    start_day_time: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Schedule end time in seconds' })
    @Validate((obj, value) => {
        if(value <= obj.start_day_time) return false;
        return true;
    }, { message: 'End time must be greater than start time'})
    end_day_time: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Initials of the days of the week (MO, TU, WE, TH, FR, SA, SU) separated by semicolons' })
    week_days: string;

    @IsArray()
    @ApiProperty({ description: 'Array of breaks' })
    @ValidateNested({ each: true })
    @Type(() => CreateBreakDto)
    breaks?: CreateBreakDto[];
}

export class UpdateSettingsDto extends PartialType(CreateSettingsDto) { }

export class FiltersSettingsDto {
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