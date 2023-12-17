import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {MemberService} from '../service';
import {MemberCreatePayload} from '../model';
import {MemberUpdatePayload} from '../model';
import {Member} from '../model';

@ApiBearerAuth('access-token')
@ApiTags('Membre')
@Controller('member')
export class MemberController {
    constructor(private readonly service: MemberService) {
    }
    @Post('create')
    create(@Body() payload: MemberCreatePayload): Promise<Member> {
        return this.service.create(payload);
    }
    @Delete('delete/:id')
    delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }
    @Get('detail/:id')
    detail(@Param('id') id: string): Promise<Member> {
        return this.service.detail(id);
    }
    @Get('list')
    getAll(): Promise<Member[]> {
        return this.service.getAll();
    }
    @Put('update')
    update(@Body() payload: MemberUpdatePayload): Promise<Member> {
        return this.service.update(payload);
    }
}
