import { Request } from 'express';
import {Users} from "../users/entities/users.entity";

export interface RequestWithUser extends Request {
    user: Users;
}

export interface CreateTokenResponse {
    accessToken: string,
    expiresIn: number,
}