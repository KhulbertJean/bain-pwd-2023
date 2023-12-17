import { SetMetadata } from '@nestjs/common';

// Clé utilisée pour marquer une route comme publique
export const IS_PUBLIC_KEY = 'isPublic';
/**
 * Décorateur permettant de marquer une route comme publique.
 * Les routes marquées comme publiques sont accessibles sans nécessiter d'authentification.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);