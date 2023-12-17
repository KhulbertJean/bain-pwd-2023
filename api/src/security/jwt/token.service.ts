import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Credential, RefreshTokenPayload, Token} from '../model';
import {Repository} from 'typeorm';
import {JwtService} from '@nestjs/jwt';
import {configManager} from '@common/config/config.manager';
import {ConfigKey} from '@common/config';
import {Builder} from 'builder-pattern';
import {TokenExpiredException,TokenGenerationException,} from '../security.exception';

/**
 * Service responsable de la gestion des tokens d'authentification.
 **/
@Injectable()
export class TokenService {
    private readonly logger = new Logger(TokenService.name);


    constructor(@InjectRepository(Token) private readonly repository: Repository<Token>,
                @InjectRepository(Credential) private readonly credentialRepository:
                    Repository<Credential>,
                private jwtService: JwtService) {
    }
/**
 * Génère un nouveau token d'authentification et de rafraîchissement pour le Credential spécifié.
 **/
    async getTokens(credential: Credential): Promise<Token> {
        try {
            await this.repository.delete({credential});
            const payload = {sub: credential.credential_id};

            // Génère le token d'authentification avec une durée de validité définie
            const token = await this.jwtService.signAsync(payload, {
                secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
                expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN)
            });

            // Génère le token de rafraîchissement avec une durée de validité définie
            const refreshToken = await this.jwtService.signAsync(payload, {
                secret: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET),
                expiresIn: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_EXPIRE_IN)
            });
            // Enregistre le nouveau token
            await this.repository.upsert(
                Builder<Token>()
                    .token(token)
                    .refreshToken(refreshToken)
                    .credential(credential)
                    .build(),
                ['credential']
            )
            return this.repository.findOneBy({token: token});
        } catch (e) {
            this.logger.error(e.message);
            throw new TokenGenerationException();
        }
    }
/**
 * Supprime tous les tokens associés à un Credential spécifié.
 **/
    async deleteFor(credential: Credential): Promise<void> {
        await this.repository.delete({credential})
    }
/**
 * Rafraîchit un token d'authentification expiré en générant un nouveau token pour le Credential spécifié.
 **/
    async refresh(payload: RefreshTokenPayload): Promise<Token> {
        try {
            const id = this.jwtService.verify(payload.refresh, {
                secret:
                    configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET)
            }).sub;
            const credential = await this.credentialRepository.findOneBy({credential_id: id});
            return await this.getTokens(credential);
        } catch (e) {
            this.logger.error(e.message);
            throw new TokenExpiredException();
        }
    }
}