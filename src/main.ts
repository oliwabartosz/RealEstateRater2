import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import "reflect-metadata";
import {ValidationPipe} from "@nestjs/common";
import {GlobalExceptionFilter} from "./filters/global-exception.filter";
import {NestExpressApplication} from '@nestjs/platform-express';
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import hbs from 'express-handlebars';
import path, { resolve } from 'path';
import {handlebarsHelpers} from "./handlebars/helpers/handlebarsHelpers";
import express from 'express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    (app as NestExpressApplication).use(helmet({
        contentSecurityPolicy: false,
    }));

    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({

            disableErrorMessages: false, // don't show errors details, while using pipes
            whitelist: true, // Dto must be checked - if someone add more than in Dto, it will be ignored
            forbidNonWhitelisted: true, // as above
            transform: true // @Params don't need Pipes like e.g. ParseIntPipe anymore (note: still validation is needed hence pipes)

        })
    );

    app.use(cookieParser());

    // hbs
    app.useStaticAssets(resolve('./src/public'));
    // Serve static files from the /public directory
    app.use('/public', express.static(path.join(process.cwd(), 'src/public')));
    app.setBaseViewsDir(resolve('./src/views'));
    app.engine('hbs', hbs({ extname: 'hbs', helpers: handlebarsHelpers }));
    app.setViewEngine('hbs');

    app.enableCors({
        origin: ['http://127.0.0.1:3001', 'http://localhost:3001'],
        allowedHeaders: ["Content-Type"],
        methods: ['GET', 'POST', 'DELETE'],
        credentials: true})

    await app.listen(3001);
}

bootstrap();
