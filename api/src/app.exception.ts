import {ApiCodeResponse, ApiException} from '@common/*';
export class TestException extends ApiException {
    constructor() {
        super(ApiCodeResponse.TEST, 200);
    }
}