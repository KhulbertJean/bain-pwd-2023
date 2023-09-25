import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {TestException} from './app.exception';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {getHelloApiResponse200} from './app.swagger';
import {ApiCodeResponse} from '@common/api/data/enum';

@ApiTags('Route de base')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }
@ApiOperation({ summary: 'Opération HelloWorld()', description:'Cette opération est celle de base'})
  @Get()
  getHello(): string {
    throw new TestException();
  }

  @ApiOperation(getHelloApiOperation)
  @ApiResponse(getHelloApiResponse200)
  @ApiResponse({status: 401, description: 'no access'})
  @Get()
  getHello():ApiResponse {
    return {result:true, code: ApiCodeResponse.STOCK_DETAIL_SUCCESS, data:null};

  }

  @ApiResponse({status: 456, description:'no access' , type:TestException})
  @Get('hello')
  getHello2(): ApiResponse {
    throw new TestException();
  }
}
