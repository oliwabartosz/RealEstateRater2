import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from '../interfaces/auth';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationUserData: RegisterUserDto) {
    const checkUser = await this.usersService.checkIfUserExists(
      registrationUserData.email,
    );

    if (checkUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(registrationUserData.password, 10);
    try {
      const createdUser = await this.usersService.register({
        ...registrationUserData,
        password: hashedPassword,
      });
      createdUser.password = undefined;

      return createdUser;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    return isPasswordMatching;
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);

    let secure = '';
    let sameSite = '';
    let httpOnly = '';

    if (process.env.DOMAIN.includes('https')) {
      secure = 'Secure;';
      sameSite = 'SameSite=None;';
      httpOnly = 'HttpOnly;';
    }

    return `jwt=${token}; ${httpOnly} ${secure} ${sameSite} Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `jwt=; HttpOnly; Path=/; Max-Age=0`;
  }
}
