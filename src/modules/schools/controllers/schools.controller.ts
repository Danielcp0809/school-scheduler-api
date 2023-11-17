import { Body, Controller, Param, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SchoolsService } from '../services/schools.service';
import { UpdateSchoolDto } from 'src/validators/schools.dto';
import { ValidatePayloadExistsPipe } from 'src/pipes/payload-exist/payload-exist.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Schools')
@UseGuards(JwtAuthGuard)
@Controller('schools')
export class SchoolsController {
    constructor(private schoolService: SchoolsService){}

    @Put(':id')
    @UsePipes(new ValidatePayloadExistsPipe())
    @ApiOperation({ summary: 'Update the school information' })
    updateSchool(@Body() body: UpdateSchoolDto, @Param('id') id: string){
        return this.schoolService.updateSchool(id, body);
    }
}
