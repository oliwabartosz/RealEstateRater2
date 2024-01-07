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

    public async getUserByEmail(email: string): Promise<Users> | null {
        const user = await this.usersRepository.findOne({
            where: {email}
        });

        return user ? user : null

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

    public async getByCurrentTokenId(currentTokenId: string): Promise<Users> | null {
        const user = await this.usersRepository.findOne({
            where: {currentTokenId},
        });

        return user ? user : null;

    }

    public async getByEmailAndHashedPwd(email: string, hashedPassword: string): Promise<Users> | null {
        const user = await this.usersRepository.findOne({
            where: {
                email: email,
                password: hashedPassword,
            }
        });

        return user ? user : null;

    }

    public async getByCurrentId(currentTokenId: string): Promise<Users> | null {
        const user = await this.usersRepository.findOne( {
            where: {
                currentTokenId,
            }
        });

        return user ? user : null;

    }

    public async saveUser(user: Users) {
        await this.usersRepository.save(user);
    }

}
