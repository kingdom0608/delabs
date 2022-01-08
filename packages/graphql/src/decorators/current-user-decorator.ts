import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/**
 * @Session decorator
 * API org Graphql resolver 세션값을 가져오는 용도
 */
export const CurrentUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const ctxType: string = ctx.getType();
  let user;
  if (ctxType === 'graphql') {
    const [, , { req }] = ctx.getArgs();
    user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
  } else {
    const req = ctx.switchToHttp().getRequest();
    user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
  }

  if (!user) {
    throw new Error('인증 에러 - 사용자 정보 부족');
  }

  return user;
});
