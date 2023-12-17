import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Response} from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    // Méthode `catch` pour traiter les exceptions de type `HttpException`
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // Modification du statut de la réponse en fonction du statut de l'exception
        response
            .status(exception.getStatus())
            // Envoi de la réponse JSON associée à l'exception
            .json(exception.getResponse());
    }
}