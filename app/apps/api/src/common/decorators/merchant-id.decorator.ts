import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// merchantId always comes from the JWT — never from request body or params
export const MerchantId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.merchantId;
  },
);
