import {Exclude} from 'class-transformer';
import {CreateDateColumn} from 'typeorm';
export abstract class BaseEntity {
    // Définition de la colonne 'created' avec le décorateur 'Exclude' pour exclure cette propriété lors de la conversion en objet JSON plat
    // et le décorateur 'CreateDateColumn' pour indiquer que cette colonne doit être automatiquement remplie avec la date de création
    @Exclude({ toPlainOnly: true })
    @CreateDateColumn()
    created: Date;

    @Exclude({ toPlainOnly: true })
    @CreateDateColumn()
    updated: Date;
}