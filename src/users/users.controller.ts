import {Body, Controller, Inject, Post} from '@nestjs/common';
import {UserRegisterResponse} from "../interfaces/users";
import {UsersService} from "./users.service";
import {UserRegisterDto} from "./dto/register.dto";

@Controller('users')
export class UsersController {

    constructor(
        @Inject(UsersService) private userService: UsersService,
    ) {
    }

    @Post('/register')
    register(
        @Body() newUser: UserRegisterDto,
    ): Promise<UserRegisterResponse> {

        return this.userService.register(newUser);
    }


}
