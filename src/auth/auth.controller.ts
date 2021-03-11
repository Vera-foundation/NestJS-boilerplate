import { Body, Req, Controller, HttpCode, Post, UseGuards, UseFilters } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from 'src/shared/base.controller';
import { ApiTags } from '@nestjs/swagger';
import { RegisterData } from './interfaces/register.interface';
import { LoginData } from './interfaces/login.interface';

@ApiTags('Authenticate')
@Controller('auth')
export class AuthenticationController extends BaseController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {
        super();
    }

    @Post('register')
    async register(@Body() registrationData: RegisterData) {
        return await this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    //   @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async logIn(@Body() request: LoginData) {
        const { username, password } = request;
        return await this.authenticationService.login(username, password);
    }

    // @UseGuards(AuthGuard('local'))
    // @Post('login')
    // async login(@Body() loginDto: LoginDto) {
    //     const { username, password } = loginDto;
    //     return this.authenticationService.login(username, password);
    // }
}