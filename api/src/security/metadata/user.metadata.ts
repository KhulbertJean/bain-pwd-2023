import {createParamDecorator, ExecutionContext} from '@nestjs/common';

/**
 * Décorateur de paramètre qui récupère l'objet utilisateur à partir de la requête.
 * Utilise `createParamDecorator` de NestJS pour créer un décorateur de paramètre personnalisé.
 **/
export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        // Récupère la requête HTTP du contexte d'exécution
        const request = ctx.switchToHttp().getRequest();
        // Renvoie l'objet utilisateur de la requête
        return request.user;
    },
);