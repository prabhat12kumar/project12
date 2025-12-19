import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('issues')
export class IssuesController {
  constructor(private readonly service: IssuesService) {}

  @Post()
  create(@Body() dto: CreateIssueDto, @Req() req) {
    return this.service.create(dto, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.service.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.service.findOne(id, req.user);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateIssueDto, @Req() req) {
    return this.service.update(id, dto, req.user);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req) {
    return this.service.delete(id, req.user);
  }
}
