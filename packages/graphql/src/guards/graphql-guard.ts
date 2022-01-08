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
    const request = this.getRequest(context);

    const token = request.headers.authorization;

    if (token === undefined) {
      throw new Error('Unauthorized');
    }

    return await jwt.verify(token, process.env.JWT_SECRET);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new Error('Unauthorized');
    }
    return user;
  }
}
