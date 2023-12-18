import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import {ulid} from 'ulid';
import {Car} from './car.entity';

@Entity
    export class Person {
    @PrimaryColumn('varchar', { length:26, default: () => `'${ulid()}'` })
    private person_id:string;

    @Column({nullable: true})
    private firstname:string;

    @Column({nullable: true})
    private lastname:string;

    @Column({nullable: true})
    private gender:string;

    @Column({nullable: true})
    private birthdate: Date;

    @OneToOne(() => Car, (car:Car)=> car.owner)
    @JoinColumn({name: 'car_id_fk', referencedColumnName: 'car_id'})
    car: Car;
}
