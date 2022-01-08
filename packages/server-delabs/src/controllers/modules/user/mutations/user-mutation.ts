import { DelabsMutation } from '@delabs/graphql';
import { UserService } from '@delabs/service-user';
import { Resolver, Args } from '@nestjs/graphql';
import { LoginInputType, UserType } from '../../../types';

@Resolver(() => UserType)
export class UserMutation {
  constructor(private readonly userService: UserService) {}

  @DelabsMutation(() => String, {
    description: '로그인',
    contributors: ['jade'],
    lastUpdate: '2021.12.21'
  })
  async login(
    @Args('loginInputData', {
      description: '로그인 데이터'
    })
    loginInputData: LoginInputType
  ): Promise<string> {
    return await this.userService.loginUser(loginInputData);
  }
}
