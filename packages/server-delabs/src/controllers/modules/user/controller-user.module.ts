import { Global, Module } from '@nestjs/common';
import { ServiceUserModule } from '@delabs/service-user';
import { UserMutation } from './mutations';
import { UserResolver } from './user-resolver';

@Global()
@Module({
  imports: [ServiceUserModule],
  providers: [UserResolver, UserMutation],
  exports: [],
  controllers: []
})
export class ControllerUserModule {}
