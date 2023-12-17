import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {ApiCodeResponse} from '@common/api/data/enum';
import {configManager} from '@common/config/config.manager';
import {ConfigKey} from '@common/config';
import {isNil} from 'lodash';
import {instanceToPlain} from 'class-transformer';

@Injectable()
export class ApiInterceptor implements NestInterceptor {
    private readonly logger = new Logger(ApiInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const path = ctx.getRequest().route.path;

        // Appel de la méthode 'handle' pour obtenir l'observable résultant
        return next.handle().pipe(

            // Utilisation de l'opérateur 'map' pour transformer la réponse
                map((response: any) => {

                    // Mapping du code d'API en fonction du chemin de la requête
                    return {
                        code: this.map(path),
                        data: instanceToPlain(response),
                        result:
                            true}
                }));
    }
    map(path: String): ApiCodeResponse {
        this.logger.log(`path ${path}`);
        const part = path

            .replace(configManager.getValue(ConfigKey.APP_BASE_URL), '')
            .split('/')
            .filter(s => s.length > 0)
            .slice(0, 2)
            .map(s => s.toUpperCase());

        const code = ApiCodeResponse[`${part.join('_')}_SUCCESS` as keyof typeof
            ApiCodeResponse];
        return isNil(code) ? ApiCodeResponse.COMMON_SUCCESS : code;
    }
}