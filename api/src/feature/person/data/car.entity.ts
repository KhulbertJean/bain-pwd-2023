import {Column, Entity, ManyToMany, PrimaryColumn} from 'typeorm';
import {ulid} from 'ulid';
import {Person} from './person.entity';

// Définition de l'entité 'Car' avec le décorateur 'Entity'
@Entity()

export class Car{
    // Définition de la colonne 'car_id' comme clé primaire ('PrimaryColumn') avec le type 'varchar', une longueur de 26 caractères
    // et une valeur par défaut générée par la fonction 'ulid()'
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    private car_id:string;

    @Column({nullable: true})
    private brand:string;

    @Column({nullable: true})
    private color:string;

    // Définition de la relation 'owner' avec le décorateur 'ManyToMany'
    @ManyToMany(()=>Person, (person)=> person.car,
        {eager:false})

    owner : Person
}