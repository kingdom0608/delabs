import { DelabsQuery, PageQuery } from '@delabs/graphql';
import { FilterToQueryPageQuery } from '@delabs/utils';
import { UserService } from '@delabs/service-user';
import { Args, Resolver, ID } from '@nestjs/graphql';
import { UserOutputType } from '../../types';

@Resolver(UserOutputType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @DelabsQuery(() => [UserOutputType], {
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

  @DelabsQuery(() => UserOutputType, {
    description: '유저 조회',
    contributors: ['jade'],
    lastUpdate: '2021.12.30',
    auth: {
      isLogin: true
    }
  })
  async user(@Args({ name: 'index', type: () => ID }) index: number) {
    return this.userService.getUserByIndex(index);
  }
}