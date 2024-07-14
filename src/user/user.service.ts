import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { IUser } from 'src/types/IUser';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async createUser(user: IUser): Promise<string> {
        try {
            const saltRounds: number = 10;
            const hash = await bcrypt.hash(user.password, saltRounds)
             
            user.password =  hash;
            await this.userRepository.save(user);
            return "User created"
        } catch(e) {
            throw new Error(e)
        }
    }

    async getUsers(): Promise<IUser[]> {
        try {
            
            const data = await this.userRepository.find()
            return data
        } catch(e) {
            throw new Error(e)
        }
    }

    async getUserByLogin(login: string): Promise<IUser> {
        try {            
            const data = await this.userRepository.findOneBy({
                login
            })
            return data
        } catch(e) {
            throw new Error(e)
        }
    }

}
