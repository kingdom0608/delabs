import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInputType {
  @Field(() => String, {
    description: '아이디'
  })
  id: string;

  @Field(() => String, {
    description: '비밀번호'
  })
  password: string;
}
