import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {TestException} from './app.exception';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';



@ApiTags('Route de base')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @ApiOperation({summary: 'Opération HelloWorld()', description: 'Cette opération est celle de base'})
  @ApiResponse({status: 200, description: 'OK'})
  @Get()
  getHello(): string {
    throw new TestException();
  }

}
