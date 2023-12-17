import { ApiOperationOptions, ApiResponseOptions} from '@nestjs/swagger';

export const AppControllerHelloWorld: ApiOperationOptions = {
    summary: 'Hello world',
    description: 'Ma super description pour cette méthode'
}
export  const getHelloApiResponse200: ApiResponseOptions = {status: 200 , description: 'the found record'}
