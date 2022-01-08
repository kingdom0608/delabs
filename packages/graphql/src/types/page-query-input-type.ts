import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrderByDirection } from '../interfaces';
import { FilterScalar } from '../scalars';

registerEnumType(OrderByDirection, {
  name: 'OrderByDirection'
});

@InputType()
export class PageQueryOrderBy {
  @Field(() => String, {
    description: '정렬 대상 필드',
    nullable: true
  })
  field: string;

  @Field(() => String, {
    description: '정렬 방향 ASC | DESC',
    nullable: true
  })
  direction: 'ASC' | 'DESC';
}

@InputType()
export class PageQueryPagination {
  @Field(() => Number, {
    description: 'Skip',
    nullable: true
  })
  skip?: number;

  @Field(() => Number, {
    description: 'First',
    nullable: true
  })
  first?: number;

  @Field(() => Number, {
    description: 'Last',
    nullable: true
  })
  last?: number;

  @Field(() => String, {
    description: 'Before',
    nullable: true
  })
  before?: string;

  @Field(() => String, {
    description: 'After',
    nullable: true
  })
  after?: string;
}

@ArgsType()
export class PageQuery {
  @Field(() => FilterScalar, {
    description: '필터',
    nullable: true
  })
  filter?: FilterScalar;

  @Field(() => PageQueryPagination, {
    description: '페이지네이션',
    nullable: true
  })
  pagination?: PageQueryPagination;

  @Field(() => [PageQueryOrderBy], {
    description: '정렬',
    nullable: true
  })
  orderBy?: PageQueryOrderBy[];
}

@ArgsType()
export class CountQuery {
  @Field(() => FilterScalar, {
    description: '필터',
    nullable: true
  })
  filter?: object;
}

@ArgsType()
export class GroupByCountQuery {
  @Field(() => String, {
    description: '필터'
  })
  groupFiled: string;

  @Field(() => FilterScalar, {
    description: '필터',
    nullable: true
  })
  filter?: object;
}
