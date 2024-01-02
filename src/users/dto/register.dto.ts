import {IsNotEmpty, IsString} from "class-validator";

export class UserRegisterDto {

    @IsString()
    @IsNotEmpty()
    email: string;
}