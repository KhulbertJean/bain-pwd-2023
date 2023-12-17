import {NestFactory} from '@nestjs/core';
import {AppModule} from './home';
import {ConfigKey, HttpExceptionFilter, ValidationException} from '@common/config';
import {swaggerConfiguration} from '@common/documentation';
import {Logger, ValidationError, ValidationPipe} from '@nestjs/common';
import {ApiInterceptor} from '@common/api/api.interceptor';
import {configManager} from '@common/config/config.manager';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(configManager.getValue(ConfigKey.APP_BASE_URL));
  swaggerConfiguration.config(app);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(parseInt(configManager.getValue(ConfigKey.APP_PORT), 10));
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => new
    ValidationException(validationErrors)
  }));
  // Utilisation de l'intercepteur global pour les réponses API
  app.useGlobalInterceptors(new ApiInterceptor());
}
bootstrap().then(()=>{
  const logger = new Logger('Main Logger');
  logger.log('Server is started !!')
})