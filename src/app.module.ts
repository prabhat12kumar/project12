import { Module, MiddlewareConsumer } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { IssuesModule } from './issues/issues.module';
import { UserContextMiddleware } from './common/middleware/user-context.middleware';

@Module({
  imports: [PrismaModule, IssuesModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserContextMiddleware).forRoutes('*');
  }
}
