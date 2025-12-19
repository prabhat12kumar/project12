import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IssuesService {
  constructor(private prisma: PrismaService) {}

  create(dto, user) {
    return this.prisma.issue.create({
      data: {
        title: dto.title,
        description: dto.description,
       
        organizationId: user.organizationId,
      },
    });
  }

  findAll(user) {
    return this.prisma.issue.findMany({
      where: { organizationId: user.organizationId },
    });
  }

  async findOne(id: string, user) {
    const issue = await this.prisma.issue.findFirst({
      where: { id, organizationId: user.organizationId },
    });
    if (!issue) throw new NotFoundException();
    return issue;
  }

  async update(id: string, dto, user) {
    const issue = await this.findOne(id, user);

    const updated = await this.prisma.issue.update({
      where: { id },
      data: dto,
    });

    

    if (dto.assigneeId && dto.assigneeId !== issue.assigneeId) {
      await this.prisma.activity.create({
        data: {
          issueId: id,
          action: 'ASSIGNEE_CHANGED',
          oldValue: issue.assigneeId,
          newValue: dto.assigneeId,
        },
      });
    }

    return updated;
  }

  async delete(id: string, user) {
    await this.findOne(id, user);
    return this.prisma.issue.delete({ where: { id } });
  }
}
