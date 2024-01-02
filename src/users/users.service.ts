import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRegisterResponse} from "../interfaces/users";
import {UserRegisterDto} from "./dto/register.dto";
import {Users} from "./entities/users.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
    ) {
    }

    async register(newUser: UserRegisterDto): Promise<UserRegisterResponse> {
        const existingUser = await this.usersRepository.findOne({
            where: {email: newUser.email}
        });

        if (existingUser) {
            return {
                statusCode: 409,
                message: "Couldn't register."
            }
        }

        const user = this.usersRepository.create(newUser);
        await this.usersRepository.save(user);

        return user;
    }
}
