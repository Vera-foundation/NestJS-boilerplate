import { ApiProperty } from "@nestjs/swagger";

export class LoginData {

    @ApiProperty({ example: 'vicknguyen' })
    username: string;

    @ApiProperty({ example: '123aA@' })
    password: string;
}

