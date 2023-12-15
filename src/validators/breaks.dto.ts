import { IsNotEmpty, IsOptional, IsString, IsPositive, Min, IsNumber, IsArray, Max, Validate, IsBoolean } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBreakDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Name of the break, 10 chars max' })
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Start time in seconds' })
    start_time: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'End time in seconds' })
    @Validate((obj, value) => {
        if(value <= obj.start_time) return false;
        return true;
    }, { message: 'End time must be greater than start time'})
    end_time: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Initials of the days of the week (MO, TU, WE, TH, FR, SA, SU) separated by semicolons' })
    week_days: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ description: 'Indicates if the breaks will repeat every day of the schedule' })
    every_day: boolean;
}