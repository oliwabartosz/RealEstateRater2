import {Strategy} from 'passport-jwt';
import {PassportStrategy} from "@nestjs/passport";
import {Users} from "../../../users/entities/users.entity";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import * as process from "process";
import {UsersService} from "../../../users/users.service";

export interface JwtPayload {
    id: string;
}

function cookieExtractor(req: any): null | string {
    return (req && req.cookies) ? (req.cookies?.jwt ?? null) : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: process.env.JWT_SECRET_OR_KEY,
        });
    }

    public async validate(
        payload: JwtPayload,
        done: (error: UnauthorizedException, user: Users | false) => void
    ) {

        if (!payload || !payload.id) {
            return done(new UnauthorizedException(), false);
        }

        const user = await this.usersService.getByCurrentTokenId(payload.id);

        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user)

    }
}