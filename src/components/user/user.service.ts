import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./user.dto";
import { User } from "./user.entity";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async checkUserExisted(username: string) {
        const userExisted = await this.userRepository.findOne({ username });
        if (userExisted) {
            return true;
        }
        return false;
    }

    async getByUsername(username: string) {
        const user = await this.userRepository.findOne({ username });
        if (user) {
            return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }

    async create(userData: CreateUserDto) {
        const newUser = await this.userRepository.create(userData);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async getProfile(token: string) {
        
    }

}
