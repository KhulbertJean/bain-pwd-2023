import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenService } from '../jwt';
import {
    CredentialDeleteException,
    SignupException,
    UserAlreadyExistException,
    UserNotFoundException,
} from '../security.exception';

import { RefreshTokenPayload, SignInPayload, SignupPayload, Token, Credential } from '../model';
import { encryptPassword } from './utils';
import { Builder } from 'builder-pattern';
import {isNil} from 'lodash';


@Injectable()
export class SecurityService {
    private readonly logger = new Logger(SecurityService.name);

    constructor(
        @InjectRepository(Credential)
        private readonly repository: Repository<Credential>,
        private readonly tokenService: TokenService,
    ) {}

    async detail(id: string): Promise<Credential> {
        const result = await this.repository.findOne({ credential_id: id });
        if (!isNil(result)) {
            return result;
        }
        throw new UserNotFoundException();
    }

    async signIn(payload: SignInPayload, isAdmin: boolean): Promise<Token | null> {
        let result = null;

        if (payload.socialLogin) {
            if (!isNil(payload.facebookHash) && payload.facebookHash.length > 0) {
                result = await this.repository.findOne({
                    facebookHash: payload.facebookHash,
                    isAdmin: isAdmin,
                });
            } else if (!isNil(payload.googleHash) && payload.googleHash.length > 0) {
                result = await this.repository.findOne({
                    googleHash: payload.googleHash,
                    isAdmin: isAdmin,
                });
            }
        } else {
            result = await this.repository.findOne({
                username: payload.username,
                isAdmin: isAdmin,
            });
        }

        if (!isNil(result)) {
            return this.tokenService.getTokens(result);
        }

        throw new UserNotFoundException();
    }

    async signup(payload: SignupPayload): Promise<Token | null> {
        const existingUser = await this.repository.findOne({username: payload.username });

        if (!isNil(existingUser)) {
            throw new UserAlreadyExistException();
        }

        try {
            const encryptedPassword = isNil(payload.facebookHash) && isNil(payload.googleHash)
                ? await encryptPassword(payload.password)
                : '';

            const newCredential = Builder<Credential>()
                .username(payload.username)
                .password(encryptedPassword)
                .facebookHash(payload.facebookHash)
                .googleHash(payload.googleHash)
                .mail(payload.mail)
                .build();

            await this.repository.save(newCredential);

            const signInPayload: SignInPayload = {
                ...payload,
                socialLogin: !(isNil(payload.facebookHash) && isNil(payload.googleHash)),
            } as SignInPayload;

            return this.signIn(signInPayload, false);
        } catch (e) {
            this.logger.error(e.message);
            throw new SignupException();
        }
    }

    async refresh(payload: RefreshTokenPayload): Promise<Token | null> {
        return this.tokenService.refresh(payload);
    }

    async delete(id: string): Promise<void> {
        try {
            const detail = await this.detail(id);
            await this.tokenService.deleteFor(detail);
            await this.repository.remove(detail);
        } catch (e) {
            throw new CredentialDeleteException();
        }
    }
}

