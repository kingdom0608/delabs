import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GraphqlGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext) {
    // CanActivate를 implements 하였으므로, canActivate 함수를 구현해야 합니다.
    const request = this.getRequest(context);
    // 클라이언트에서 보낸 request 정보를 읽어옵니다.

    const token = request.headers.authorization;
    // 사용자가 헤더에 보낸 token key값의 토큰값.

    if (token === undefined) {
      // 토큰이 전송되지 않았다면
      // throw new HttpError(401, '토큰이 전송되지 않았습니다.');
    }

    const a = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(a);
    // request.user 객체에 디코딩된 토큰(유저 정보)을 저장합니다.
    return true;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new Error('Unauthorized');
    }
    return user;
  }
}
