import { Body, Controller, Get, Param, Post, Put, Query, Req, SetMetadata, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidatePayloadExistsPipe } from 'src/pipes/payload-exist/payload-exist.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SettingsService } from '../services/settings.service';
import { CreateSettingsDto, FiltersSettingsDto } from 'src/validators/settings.dto';

@ApiTags('Settings')
@UseGuards(JwtAuthGuard) // Makes all endpoints private by default 
@Controller('settings')
export class SettingsController {
    constructor(private settingsService: SettingsService) {}

    @Get()
    @ApiOperation({ summary: 'Get the list of a settings' })
    getSettings(@Query() params: FiltersSettingsDto, @Req() req: any) {
        const schoolId = req.user.school_id;
        return this.settingsService.getAllSettings(params, schoolId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new setting' })
    createNewSetting(@Body() body: CreateSettingsDto, @Req() req: any) {
        const schoolId = req.user.school_id;
        return this.settingsService.createSetting(body, schoolId);
    }
}
