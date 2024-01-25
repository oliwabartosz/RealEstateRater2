import {RequestWithUser} from "../../interfaces/auth";

export function getDomainAndPort() {
    return {
        domain: process.env.DOMAIN,
        port: process.env.PORT
    };
}
export function getUserInfo(request: RequestWithUser) {
    return {
        username: request.user.name,
        id: request.user.id,
        userRole: request.user.roles,
    };
}