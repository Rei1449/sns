import { Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { text } from 'stream/consumers';

@Controller('test')
export class TestController {

    constructor(readonly testService:TestService) {}

    @Get('/')
    findAll(): Promise<any[]> {
        return this.testService.findAll();
    }

    @Post('/')
    insert(): Promise<any> {
        return this.testService.insert();
    }

}


