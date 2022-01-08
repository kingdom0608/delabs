import { CurrentUser, DelabsQuery, PageQuery } from '@delabs/graphql';
import { FilterToQueryPageQuery } from '@delabs/utils';
import { UserService } from '@delabs/service-user';
import { Args, Resolver } from '@nestjs/graphql';
import { UserType } from '../../../types/user';

@Resolver(UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @DelabsQuery(() => [UserType], {
    nullable: true,
    description: '유저 리스트 조회',
    contributors: ['jade'],
    lastUpdate: '2021.12.30',
    auth: {
      isLogin: true
    }
  })
  async users(@Args() pageQuery: PageQuery): Promise<any> {
    /** 권한 필터 추가 */
    const authFilter = {};

    return this.userService.listUser(authFilter, pageQuery as FilterToQueryPageQuery);
  }

  @DelabsQuery(() => UserType, {
    description: '유저 조회',
    contributors: ['jade'],
    lastUpdate: '2021.12.30',
    auth: {
      isLogin: true
    }
  })
  async user(@CurrentUser() currentUser) {
    return this.userService.getUserByIndex(currentUser.index);
  }
}
