import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/components/user/user.service";
import * as bcrypt from 'bcrypt';
import { RegisterData } from "./interfaces/register.interface";
import { CreateUserDto } from "src/components/user/user.dto";
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from "./interfaces/jwt.interface";


@Injectable()
export class AuthenticationService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    public async register(registerData: RegisterData) {

        try {
            const { username, password } = registerData;

            // check if the user exists in the db    
            const userExisted = await this.userService.checkUserExisted(username);

            if (userExisted) {
                throw new HttpException('User is already exists', HttpStatus.BAD_REQUEST);
            }

            const createUserDto: CreateUserDto = {
                username: username,
                password: password
            }
            const createdUser = await this.userService.create(createUserDto);
            return createdUser;

        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    public async getAuthenticatedUser(username: string, password: string) {
        try {
            const user = await this.userService.getByUsername(username);

            await bcrypt.genSalt(process.env.AUTH_BCRYPT_GEN_SALT);
            const isPasswordMatching = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordMatching) {
                throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
            }

            return user;

        } catch (error) {
            throw error;
        }
    }

    private async generateToken(payload: JwtPayload) {
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
    }

    public async login(username: string, password: string) {
        const userAuthenticated = await this.getAuthenticatedUser(username, password);
        const payload: JwtPayload = { userId: userAuthenticated.id, username: userAuthenticated.username };
        const token = await this.generateToken(payload);

        return {
            user: userAuthenticated,
            token
        };

    }
}