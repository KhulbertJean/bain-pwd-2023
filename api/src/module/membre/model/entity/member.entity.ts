import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn} from 'typeorm';
import {BaseEntity} from '@common/model/base.entity';
import {ulid} from 'ulid';
import {MemberSubscription} from './membre-subscription.entity';
import {Address} from '@common/model/address.entity';
import {BeforeInsert} from 'typeorm/browser';
import {isNil} from '@nestjs/common/utils/shared.utils';
import {GENDER} from '@common/config';

@Entity()
export class Member extends BaseEntity {
    @PrimaryColumn('varchar', {length: 26, default: () => `'${ulid()}'`})
    member_id: string;

    @Column({length: 50, nullable: true})
    firstname: string;

    @Column({length: 50, nullable: true})
    lastname: string;

    @Column({nullable: true})
    birthdate: Date;

    @Column({length: 10, nullable: true, default: GENDER.OTHER})
    gender: GENDER;

    @Column({length: 50, nullable: true})
    mail: string;

    @Column({length: 15, nullable: true})
    phone: string;

    @Column({length: 34, nullable: true})
    iban: string;

    @Column({length: 10, nullable: true})
    code_activation: string;

    @OneToMany(() => MemberSubscription, (ms) => ms.member,
        {cascade: true, eager: true})
    subscriptions: MemberSubscription[];

    @OneToOne(() => Address, {cascade: true,eager: true})
    @JoinColumn({referencedColumnName: 'address_id', name: 'address_id_fk'})
    address:Address
    @Column({default: false})
    active: boolean

    @BeforeInsert()
    setId() {
        console.log('im here', this.code_activation);
        this.code_activation = isNil(this.code_activation) ? ulid().substring(0, 10) :
            this.code_activation;
    }
}
