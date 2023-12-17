import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {configManager} from '@common/config/config.manager';
import {APP_GUARD} from '@nestjs/core';
import {JwtGuard} from '../security/jwt/jwt.guard';
import {SecurityModule} from '../security/security.module';
import {MemberModule} from '../module/member.module';

@Module({
  // Importation des modules requis : TypeOrmModule pour la connexion à la base de données,
  // MemberModule pour les fonctionnalités liées aux membres, SecurityModule pour les fonctionnalités de sécurité
  imports: [
    TypeOrmModule.forRoot(configManager.getTypeOrmConfig()),
    MemberModule,
    SecurityModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD, useClass: JwtGuard
  }],
})
export class AppModule {
}



