import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.user = {
      userId: req.headers['x-user-id'] || 'user-1',
      organizationId: req.headers['x-org-id'] || 'org-1',
      role: req.headers['x-user-role'] || 'MEMBER',
    };
    next();
  }
}
