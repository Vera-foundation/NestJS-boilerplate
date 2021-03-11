import { ApiProperty } from "@nestjs/swagger";

export class RegisterData {

    @ApiProperty({ example: 'vicknguyen' })
    username: string;

    @ApiProperty({ example: '123aA@' })
    password: string;

}  