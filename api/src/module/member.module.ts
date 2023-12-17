import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MemberSubscription} from './membre';
import {Address} from '@common/model/address.entity';
import {MemberPlan} from './membre';
import {Member} from './membre';
import {MemberController} from './membre';
import {MemberService} from './membre';
import {MemberPlanService} from './membre';
import {MemberPlanController} from './membre';

@Module({
    imports: [TypeOrmModule.forFeature([Member, MemberPlan, MemberSubscription, Address])],
    controllers: [MemberController, MemberPlanController],
    providers: [MemberPlanService, MemberService]
})

export class MemberModule {

}