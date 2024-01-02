export type UserRegisterResponse = {
    id: string;
    email: string;
} | {
    statusCode: number;
    message: string;
}