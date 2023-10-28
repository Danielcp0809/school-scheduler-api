import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { Credentials } from 'src/models/credentials.entity';
import { RefreshTokenDto } from 'src/validators/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('/')
    @UseGuards(AuthGuard('local'))
    login(@Req() req: Request){
        return this.authService.generateJwtToken(req.user as Credentials);
    }

    @Post('/refresh')
    refreshToken(@Body() body: RefreshTokenDto){
        return this.authService.refreshToken(body)
    }
}
