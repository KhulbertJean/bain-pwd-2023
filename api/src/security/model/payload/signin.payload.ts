import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';

export class SignInPayload {
    @ApiProperty()      // Définit la propriété dans la documentation Swagger
    @IsNotEmpty()       // Applique la validation pour garantir que le champ n'est pas vide
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @ApiProperty()
    @IsOptional()
    googleHash: string;

    @IsOptional()
    @ApiProperty()
    facebookHash: string;

    @ApiProperty()
    socialLogin: boolean;   // Indique si la connexion est effectuée via un réseau social
}