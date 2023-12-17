import {HttpException, ValidationError} from '@nestjs/common';
import {ApiCodeResponse} from '@common/api/data/enum/api-code.response';
import {isNil} from 'lodash';

export class ApiException extends HttpException{
    constructor(code:ApiCodeResponse, status:number) {
        super({
            code: code,     // Code d'erreur spécifié
            data: null,     // Données associées à l'erreur
            result: false   // Indicateur de résultat
        }, status);         // Statut HTTP de la réponse associée à cette exception
    }
}
export class ValidationException extends HttpException {
    constructor(errors: ValidationError[]) {
        console.log(errors);
        super({
            code: ApiCodeResponse.PAYLOAD_IS_NOT_VALID,
            data: errors.map((e) => Object.values(e.constraints)).flat(),
            result: false
        }, 499);
    }
}
export const validationErrorToApiCodeResponse = (error: ValidationError): ApiCodeResponse[] =>
{
    return Object.keys(error.constraints).map((k: string) => {
        const code = ApiCodeResponse[`${camelToSnake(error.property)}_${camelToSnake(k)}` as
            keyof typeof ApiCodeResponse];
        return isNil(code) ? ApiCodeResponse.PAYLOAD_PARAM_IS_MISSING : code;
    });
}
export const camelToSnake = (str: string): string => {
    return str.replace(/([A-Z])/g, " $1").split(' ').join('_').toUpperCase();
}