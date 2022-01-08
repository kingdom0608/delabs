import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from './user-type';

@ObjectType()
export class CreateUserPayloadType {
  @Field(() => UserType)
  user: Partial<UserType>;
}
