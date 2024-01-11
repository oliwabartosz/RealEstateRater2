import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
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

    public async getUserByEmail(email: string): Promise<Users> {
        const user = await this.usersRepository.findOne({
            where: {email}
        });

        if (user) {
            return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);

    }

    public async register(newUser: UserRegisterDto): Promise<UserRegisterResponse> {
        const user = this.usersRepository.create(newUser);
        await this.usersRepository.save(user);

        return user;
    }

    public async checkIfUserExists(email: string): Promise<void> {
        const userExists = await this.getUserByEmail(email);
        if (!userExists) {
            return;
        }
        throw new HttpException('E-mail exists!', HttpStatus.BAD_REQUEST);
    }


    async getById(id: string): Promise<Users> {
        const user = await this.usersRepository.findOne({ where: {id} });
        if (user) {
            return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }




}
