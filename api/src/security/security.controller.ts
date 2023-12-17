import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {RefreshTokenPayload, SignInPayload, SignupPayload} from './model';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Public} from './metadata';
import {User} from './metadata';
import {SecurityService} from './service';

@ApiBearerAuth('access-token')
@ApiTags('Account')
@Controller('account')
@ApiBearerAuth('access-token')
export class SecurityController {
    constructor(private readonly service: SecurityService) {
    }
    @Public()
    @Post('signin')     //Route POST pour la connexion
    public signIn(@Body() payload: SignInPayload) {
        return this.service.signIn(payload, false);
    }
    @Public()
    @Post('admin-signin')   // Route POST pour la connexion en tant qu'administrateur
    public adminSignIn(@Body() payload: SignInPayload) {
        return this.service.signIn(payload,true);
    }
    @Public()
    @Post('signup')     // Route POST pour l'inscription
    public signUp(@Body() payload: SignupPayload) {
        return this.service.signup(payload);
    }
    @Public()
    @Post('refresh')    // Route POST pour le rafraîchissement du jeton
    public refresh(@Body() payload: RefreshTokenPayload) {
        return this.service.refresh(payload);
    }
    @Get('me')      // Route GET pour récupérer les détails de l'utilisateur actuel
    public me(@User() user: Credential) {
        return user;
    }
    @Delete('delete/:id')       // Route DELETE pour supprimer un utilisateur par ID
    public delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
