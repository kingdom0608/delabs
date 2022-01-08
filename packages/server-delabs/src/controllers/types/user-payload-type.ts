import { ObjectType, Field } from '@nestjs/graphql';
import { UserOutputType } from './user-output-type';

@ObjectType()
export class CreateUserPayloadType {
  @Field(() => UserOutputType)
  user: Partial<UserOutputType>;
}
