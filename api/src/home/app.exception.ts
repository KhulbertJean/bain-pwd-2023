import {ApiCodeResponse} from '@common/api';
import {ApiException} from '@common/config';

export class TestException extends ApiException {
    constructor() {
        // Appel du constructeur de la classe mère 'ApiException' avec le code de réponse 'TEST' et le statut HTTP 200
        super(ApiCodeResponse.TEST, 200);
    }
}