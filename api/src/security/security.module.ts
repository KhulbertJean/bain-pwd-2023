import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Credential, Token} from './model';
import { TokenService } from './jwt';
import { SecurityService } from './service';
import { SecurityController } from './security.controller';
import {JwtModule} from '@nestjs/jwt';
import {configManager} from '@common/config/config.manager';
import {ConfigKey} from '@common/config';

@Module({
    // Importation des modules requis : JwtModule pour la gestion des tokens JWT et TypeOrmModule pour l'intégration avec TypeORM
    imports: [JwtModule.register({

        global: true,   // Indique que le module JwtModule doit être global, accessible dans l'ensemble de l'application
        secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET), // Clé secrète utilisée pour signer les tokens JWT
        signOptions: {expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN)},    // Options de signature, y compris la durée de validité des tokens

    }), TypeOrmModule.forFeature([Credential, Token])], // Intégration de TypeOrmModule avec les entités 'Credential' et 'Token'

// Exportation des services 'SecurityService' et 'TokenService' pour les rendre accessibles depuis d'autres modules
    exports: [SecurityService],
    providers: [SecurityService, TokenService], // Définition des fournisseurs de services (services, controllers) utilisés dans le module
    controllers: [SecurityController]
})
export class SecurityModule {
}