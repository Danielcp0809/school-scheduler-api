import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from 'src/models/credentials.entity';
import { TokenPayload } from '../interfaces/token.interface';
import { instanceToPlain } from 'class-transformer';
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
            user: credentials.user,
        }
    }
}
