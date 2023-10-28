import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from 'src/models/credentials.entity';
import { TokenPayload } from '../interfaces/token.interface';
import { instanceToPlain } from 'class-transformer';
import { RefreshTokenDto } from 'src/validators/auth.dto';
import { TokenExpiredError } from 'jsonwebtoken';
@Injectable()
export class AuthService {

    constructor(
        private usersServices: UsersService,
        private jwtService: JwtService,
    ){}

    async validateUserCredentials(username: string, password: string){
        const usersCredentials = await this.usersServices.findUserByCredentials(username);
        const isMatch = await bcrypt.compare(password, usersCredentials.password);
        if(isMatch) return instanceToPlain(usersCredentials) as Credentials;
        return null;
    }

    async generateJwtToken(credentials: Credentials){
        const payload: TokenPayload = {
            sub: credentials.user.id,
            username: credentials.username,
            school_id: credentials.user.school.id,
            is_admin: credentials.is_admin,
        }
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, {expiresIn: '7d'}),
            user: credentials.user,
        }
    }

    async refreshToken(body: RefreshTokenDto){
        try {
            const payload = this.jwtService.verify(body.refresh_token);
            const credentials = await this.usersServices.findUserByCredentials(payload.username);
            if(!credentials) throw new UnauthorizedException('Invalid credentials');
            const newCredentials = await this.generateJwtToken(credentials);
            delete newCredentials.user;
            return newCredentials;
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new ForbiddenException('Token has expired');
            }
        }
    }
}
