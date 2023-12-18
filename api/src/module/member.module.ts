import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MemberSubscription} from './member';
import {Address} from '@common/model/address.entity';
import {MemberPlan} from './member';
import {Member} from './member';
import {MemberController} from './member';
import {MemberService} from './member';
import {MemberPlanService} from './member';
import {MemberPlanController} from './member';

@Module({
    imports: [TypeOrmModule.forFeature([Member, MemberPlan, MemberSubscription, Address])],
    controllers: [MemberController, MemberPlanController],
    providers: [MemberPlanService, MemberService]
})

export class MemberModule {

}