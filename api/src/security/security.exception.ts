import {ApiCodeResponse} from '@common/api';
import {ApiException} from '@common/config';

// Définition de la classe 'NoTokenFoundedException' qui étend la classe 'ApiException'
export class NoTokenFoundedException extends ApiException {
    // Constructeur de la classe 'NoTokenFoundedException'
    constructor() {
        // Appel du constructeur de la classe mère 'ApiException' avec le code de réponse 'NO_TOKEN_FOUNDED' et le statut HTTP 401
        super(ApiCodeResponse.NO_TOKEN_FOUNDED, 401);
    }
}
export class UserNotFoundException extends ApiException {
    constructor() {
        super(ApiCodeResponse.USER_NOT_FOUND, 200);
    }
}
export class TokenExpiredException extends ApiException {
    constructor() {
        super(ApiCodeResponse.TOKEN_EXPIRED, 401);
    }
}
export class SignupException extends ApiException {
    constructor() {
        super(ApiCodeResponse.SIGNUP_ERROR, 200);
    }
}
export class CredentialDeleteException extends ApiException {
    constructor() {
        super(ApiCodeResponse.CREDENTIAL_DELETE_ERROR, 200);
    }
}
export class UserAlreadyExistException extends ApiException {
    constructor() {
        super(ApiCodeResponse.USER_ALREADY_EXIST, 200);
    }
}
export class TokenGenerationException extends ApiException {
    constructor() {
        super(ApiCodeResponse.TOKEN_GEN_ERROR, 500);
    }
}
