import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credentials } from 'src/models/credentials.entity';
import { User } from 'src/models/users.entity';
import { CreateUserDto } from 'src/validators/users.dto';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { School } from 'src/models/schools.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Credentials) private credentialsRepository: Repository<Credentials>,
        @InjectRepository(School) private schoolRepository: Repository<School>,
    ) { }

    async createUser(params: CreateUserDto) {
        try {
            const { first_name, last_name, email, username, password, school_id } = params;
            if (!isUUID(school_id)) throw new BadRequestException('School id has an invalid UUID format');
            const newUser = this.userRepository.create({ first_name, last_name, email });
            const encryptedPassword = await bcrypt.hash(password, 10);
            const newCredentials = this.credentialsRepository.create({ username, password: encryptedPassword });
            const school = await this.schoolRepository.findOneBy({ id: school_id });
            if (!school) throw new NotFoundException('School not found');
            newCredentials.save();
            newUser.school = school;
            newUser.credentials = newCredentials;
            return await this.userRepository.save(newUser);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new ConflictException('User already exists');
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }

    async findUserByCredentials(search: string) {
        try {
            let userCredentials = await this.credentialsRepository.findOne({
                where: [
                    { username: search },
                    { user: { email: search } }
                ],
                relations: ['user'],
            });
            if (!userCredentials) throw new NotFoundException('User not found');
            delete userCredentials.user
            return userCredentials;
        } catch (error) {
            if(error instanceof InternalServerErrorException){
                throw new InternalServerErrorException(error.message);
            }
            throw error
        }
    }
}
