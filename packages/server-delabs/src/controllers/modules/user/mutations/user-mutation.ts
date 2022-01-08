import { DelabsMutation } from '@delabs/graphql';
import { UserService } from '@delabs/service-user';
import { Resolver, Args } from '@nestjs/graphql';
import { UserOutputType } from '../../../types';

@Resolver(() => UserOutputType)
export class UserMutation {
  constructor(private readonly userService: UserService) {}

  @DelabsMutation(() => String, {
    description: '유저 로그인',
    contributors: ['jade'],
    lastUpdate: '2021.12.21'
  })
  async loginUser(
    @Args({ name: 'id', type: () => String }) id: string,
    @Args({ name: 'password', type: () => String }) password: string
  ): Promise<string> {
    return await this.userService.signInUser({
      id: id,
      password: password
    });
  }
}
