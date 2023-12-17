import {InjectRepository} from '@nestjs/typeorm';
import {Builder} from 'builder-pattern';
import {Member} from '../model/entity/member.entity';
import {Repository} from 'typeorm/browser';
import {isNil} from '@nestjs/common/utils/shared.utils';

import {MemberCreatePayload} from '../model/payload/member-create.payload';
import {MemberUpdatePayload} from '../model/payload/member-update.payload';

export class MemberService {constructor(@InjectRepository(Member) private readonly repository:
                                            Repository<Member>) {}
    async create(payload: MemberCreatePayload): Promise<Member> {
        try {
            const newMember = Object.assign(new Member(), Builder<Member>()
                .firstname(payload.firstname).lastname(payload.lastname)
                .mail(payload.mail).iban(payload.iban)
                .phone(payload.phone).gender(payload.gender)
                .birthdate(payload.birthdate).address(payload.address)
                .active(payload.active) .code_activation(payload.code_activation).build());
            return await this.repository.save(newMember);
        } catch (e) {
            throw new MemberCreateException();
        }
    }
    async delete(id: string): Promise<void> {
        try {
            const detail = await this.detail(id);
            await this.repository.remove(detail);
        } catch (e) {
            throw new MemberDeleteException();
        }
    }
    async detail(id: string): Promise<Member> {
        const result = await this.repository.findOneBy({member_id: id});
        if (!(isNil(result))) {
            return result;
        }
        throw new MemberNotFoundException();
    }
    async getAll(): Promise<Member[]> {
        try {
            return await this.repository.find();
        } catch (e) {
            throw new MemberListException();
        }
    }
    async update(payload: MemberUpdatePayload): Promise<Member> {
        try {
            let detail = await this.detail(payload.member_id);
            detail.firstname = payload.firstname;
            detail.lastname = payload.lastname;
            detail.birthdate = payload.birthdate;
            detail.gender = payload.gender;
            detail.mail = payload.mail;
            detail.phone = payload.phone;
            detail.iban = payload.iban;
            detail.address = payload.address;
            detail.active = payload.active;
            detail.subscriptions = payload.subscriptions;
            return await this.repository.save(detail);
        } catch (e) {
            throw new MemberUpdateException();
        }
    }
}
