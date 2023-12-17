// Énumération des codes de réponse API avec leurs valeurs associées
export enum ApiCodeResponse{

    TEST ='api.result.test',
    STOCK_DETAIL_SUCCESS = 'api.security.error.signup',
    NO_TOKEN_FOUNDED = 'api.security.error.no-token',
    USER_NOT_FOUND = 'api.security.error.user-not-found-found',
    TOKEN_EXPIRED = 'api.security.error.token-expired',
    SIGNUP_ERROR = 'api.security.error.signup',
    CREDENTIAL_DELETE_ERROR = 'api.security.error.credential-delete',
    USER_ALREADY_EXIST = 'api.security.error.user-exist',
    TOKEN_GEN_ERROR = 'api.security.error.token-gen',
    PAYLOAD_IS_NOT_VALID = 'api.payload.error.payload-is-not-valid',
    PAYLOAD_PARAM_IS_MISSING = 'api.payload.error.payload-param-is-missing',
    COMMON_SUCCESS = '499',
    MEMBER_PAYLOAD_MEMBER_ID_MANDATORY = 'api.payload.error.member-id-mandatory',
    MEMBER_PAYLOAD_MEMBER_ID_LENGTH_ERROR = 'api.payload.error.member-id-length-error',
    MEMBER_PAYLOAD_FIRSTNAME_IS_NOT_STRING = 'api.payload.error.firstname-is-not-string',
    MEMBER_PAYLOAD_FIRSTNAME_LENGTH_ERROR = 'api.payload.error.firstname-length-error',
    MEMBER_PAYLOAD_LASTNAME_IS_NOT_STRING = 'api.payload.error.lastname-is-not-string',
    MEMBER_PAYLOAD_LASTNAME_LENGTH_ERROR = 'api.payload.error.lastname-length-error',
    MEMBER_PAYLOAD_BIRTHDATE_IS_NOT_VALID = 'api.payload.error.birthdate-is-not-valid',
    MEMBER_PAYLOAD_GENDER_IS_NOT_VALID = 'api.payload.error.gender-is-not-valid',
    MEMBER_PAYLOAD_MAIL_IS_NOT_VALID = 'api.payload.error.mail-is-not-valid',
    MEMBER_PAYLOAD_MAIL_LENGTH_ERROR = 'api.payload.error.mail-length-error',
    MEMBER_PAYLOAD_PHONE_LENGTH_ERROR = 'api.payload.error.phone-length-error',
    MEMBER_PAYLOAD_IBAN_LENGTH_ERROR = 'api.payload.error.iban-length-error',
    MEMBER_PAYLOAD_ACTIVATION_CODE_LENGTH_ERROR = 'api.payload.error.activation-code-length-error',
    MEMBER_PAYLOAD_SUBSCRIPTION_NOT_VALID = 'api.payload.error.subscription-not-valid',
    MEMBER_PAYLOAD_ACTIVE_INVALID = 'api.payload.error.active-invalid',


}