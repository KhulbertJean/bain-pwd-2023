import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, Length} from 'class-validator';

export class SignupPayload {
    @ApiProperty()  // Définit la propriété dans la documentation Swagger
    @IsNotEmpty()   // Applique la validation pour garantir que le champ n'est pas vide
    @Length(1,10)
    username: string

    @ApiProperty()
    @IsNotEmpty()
    @Length(1,10)
    password: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    mail: string

    @ApiProperty()
    googleHash: string

    @ApiProperty()
    facebookHash: string
}