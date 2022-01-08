import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => Int, {
    description: '인덱스'
  })
  index: number;

  @Field(() => ID, {
    description: '아이디'
  })
  id: string;

  @Field(() => String, {
    description: '이름'
  })
  name: string;

  @Field(() => String, {
    description: '상태'
  })
  status: string;

  @Field(() => Date, {
    description: '생성 일자'
  })
  createdAt: Date;

  @Field(() => Date, {
    description: '갱신 일자'
  })
  updatedAt: Date;
}
