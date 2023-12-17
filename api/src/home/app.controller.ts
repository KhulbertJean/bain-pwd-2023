import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {TestException} from './app.exception';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ApiCodeResponse} from '@common/api/data/enum';


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

  @ApiOperation({summary: 'Opération HelloWorld2()', description: 'Cette opération retourne un objet ApiResponse'})
  @ApiResponse({status: 200, description: 'OK', type: ApiResponse})
  @ApiResponse({status: 401, description: 'Accès non autorisé'})
  @Get('hello')
  getHello2(): ApiResponse {
    return {result: true, code: ApiCodeResponse.STOCK_DETAIL_SUCCESS, data: null};
  }

  @ApiOperation({summary: 'Opération HelloWorld3()', description: 'Cette opération génère une exception personnalisée'})
  @ApiResponse({status: 456, description: 'Accès non autorisé', type: TestException})
  @Get('hello3')
  getHello3(): ApiResponse {
    throw new TestException();
  }
}
