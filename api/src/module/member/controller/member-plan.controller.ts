import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {MemberPlanUpdatePayload} from '../model';
import {MemberPlanService} from '../service';
import {MemberPlan} from '../model';
import {MemberPlanCreatePayload} from '../model';

@ApiBearerAuth('access-token')
@ApiTags('Abonnement membre')
@Controller('member-plan')
export class MemberPlanController {
    constructor(private readonly service: MemberPlanService) {
    }
    @Post('create')
    create(@Body() payload: MemberPlanCreatePayload): Promise<MemberPlan> {
        return this.service.create(payload);
    }
    @Delete('delete/:id')
    delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }
    @Get('detail/:id')
    detail(@Param('id') id: string): Promise<MemberPlan> {
        return this.service.detail(id);
    }
    @Get('list')
    getAll(): Promise<MemberPlan[]> {
        return this.service.getAll();
    }
    @Put('update')
    update(@Body() payload: MemberPlanUpdatePayload): Promise<MemberPlan> {
        return this.service.update(payload);
    }
}