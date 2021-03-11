import { Controller } from "@nestjs/common";

import { UserService } from "./user.service";
import { ApiTags } from '@nestjs/swagger';


@ApiTags("User")
@Controller("users")
export class UserController {
    constructor(public service: UserService) { }
}
