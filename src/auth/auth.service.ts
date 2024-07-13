import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IResponse } from 'src/types/IResponse';

const hashedPassword = '$2b$10$nXERGAJ7nOkfzfTqr6fKMeyIFqY4emOcifuDLsGxxjesswqOw6N0S';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}


    async signIn(
        login: string,
        password: string
    ): Promise<IResponse<{ access_token: string }>> {
        try {
            const user = await this.usersService.getUserByLogin(login);
            if(!user){
                throw new Error("User not found")
            }
            const authenticated = await bcrypt.compare(password, user.password);
            if(!authenticated) {
                throw new Error("Wrong password")
            }

            const payload = { id: user.id, login: user.login, role: user.role };
            
            return {
                statusCode: 200,
                message: "OK",
                result: {
                    access_token: await this.jwtService.signAsync(payload),
                }
            }
        } catch(e) {
            throw new Error(e)
        }
    }
}
