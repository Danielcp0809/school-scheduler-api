import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from 'src/validators/users.dto';

@ApiTags('Users') 
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    createUser(@Body() params: CreateUserDto){
        return this.userService.createUser(params);
    }
}
