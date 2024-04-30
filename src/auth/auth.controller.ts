import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserRegisterResponse } from '../interfaces/users';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from '../interfaces/auth';
import { Response } from 'express';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import JwtAuthGuard from '../guards/jwt-auth.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle({ short: true })
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registrationUserData: RegisterUserDto,
  ): Promise<UserRegisterResponse> {
    return this.authService.register(registrationUserData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
