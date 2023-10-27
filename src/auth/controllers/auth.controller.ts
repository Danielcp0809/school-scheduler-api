import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { Credentials } from 'src/models/credentials.entity';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post()
    @UseGuards(AuthGuard('local'))
    login(@Req() req: Request){
        return this.authService.generateJwtToken(req.user as Credentials);
    }
}
