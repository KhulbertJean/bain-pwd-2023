import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {INestApplication} from '@nestjs/common';
class SwaggerConfiguration {
    constructor() {
    }
    config(app: INestApplication<any>) {
        // Création d'une instance de DocumentBuilder pour définir la configuration de Swagger
        const config = new DocumentBuilder()

            .setTitle('NestJS API')                     // Titre de l'API
            .setDescription('NestJS swagger document')  // Description de l'API
            .setVersion('1.0')                          // Version de l'API
            .addBearerAuth(
                {

                    description: `Please enter token`,  // Description du champ d'authentification Bearer
                    name: 'Authorization',              // Nom du champ d'authentification
                    bearerFormat: 'Bearer',             // Format du token
                    scheme: 'Bearer',                   // Schéma d'authentification
                    type: 'http',                       // Type d'authentification
                    in: 'Header'                        // Emplacement du token dans l'en-tête de la requête

                },
                'access-token',
            )
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document);
    }
}
const swaggerConfiguration = new SwaggerConfiguration();
export {swaggerConfiguration};
