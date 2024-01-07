import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata";
import {ValidationPipe} from "@nestjs/common";
import {GlobalExceptionFilter} from "./filters/global-exception.filter";
import {NestExpressApplication} from '@nestjs/platform-express';
import helmet from "helmet";
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  (app as NestExpressApplication).use(helmet());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false, // don't show errors details, while using pipes

    whitelist: true, // Dto must be checked - if someone add more than in Dto, it will be ignored
    forbidNonWhitelisted: true, // as above

    transform: true // @Params don't need Pipes like e.g. ParseIntPipe anymore (note: still validation is needed hence pipes)
      })
  );
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
