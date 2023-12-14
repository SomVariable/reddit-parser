import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserParam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    switch (ctx.getType()) {
      case 'http':
        const httpRequest = ctx.switchToHttp().getRequest();
        const user = httpRequest.user;

        if (user && user.id === -1) return null;

        return data ? user?.[data] : user;
      case 'ws':
        return ctx.switchToWs().getClient().data;
    }
  },
);
