import {IsNotEmpty, IsString} from "class-validator";
import {PrimaryGeneratedColumn} from "typeorm";

export class UserRegisterDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;



}