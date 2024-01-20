import {Controller, Get, Res} from '@nestjs/common';
import {Response} from 'express';

@Controller('/flats')
export class HandlebarsController {
    @Get()
    getHello(@Res() res: Response){
        return res.render('test.hbs');
    }


}
