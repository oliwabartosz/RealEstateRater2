import {IsNotEmpty, IsString} from "class-validator";

export class AddApiKeyDto {
    @IsString()
    @IsNotEmpty()
    apiKey: string;
}