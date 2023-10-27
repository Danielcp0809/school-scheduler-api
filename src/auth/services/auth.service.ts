import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/validators/users.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {

    constructor(
        private usersServices: UsersService
    ){}

    async validateUserCredentials(username: string, password: string){
        const usersCredentials = await this.usersServices.findUserByCredentials(username);
        const isMatch = await bcrypt.compare(password, usersCredentials.password);
        if(isMatch) return instanceToPlain(usersCredentials);
        return null;
    }
}
